import dayjs from "dayjs";
import inboxHelper from "../helpers/inbox";
import manualModeHelper from "../helpers/manualMode";

class InboxStore {
    constructor(apiBaseUrl, participantId, resource, studyId, auth) {
        this.apiBaseUrl = apiBaseUrl;
        this.participantId = participantId;
        this.resource = resource;
        this.studyId = studyId;
        this.auth = auth;

        this.messagesObj = {};
        this.selectedMessage = null;
        this.aiGeneratedResponse = null;

        this.meta = {
            lastUpdated: null,
            oldest: null,
            pageSize: 50
        };
        this.loading = {
            older: false,
            initial: false,
            polling: false,
            send: false,
            suggestResponse: false,
            refreshResponse: false,
        };
        this.imageCache = {};
    }

    authCredentials() {
        if (this.auth.method === 'session') {
            return {
                credentials: "include"
            }
        } else if (this.auth.apiKey.length > 0) {
            return {
                headers: new Headers({
                    'Authorization': 'Bearer ' + this.auth.apiKey,
                })
            }
        }
    };

    async fetchImage(url) {
        if (this.imageCache[url]) {
            return this.imageCache[url];
        }

        let auth = this.authCredentials();
        let requestParams = Object.assign(auth, {
            method: "GET"
        });
        let res = await fetch(url, requestParams);
        let blob = await res.blob();

        this.imageCache[url] = URL.createObjectURL(blob);

        return this.imageCache[url];
    };

    getImageUrl(msgId, imageIndex) {
        return `${this.apiBaseUrl}/api/v2/text_messages/${msgId}/image/${imageIndex}`;
    };

    async enableManualMode() {
        const requestParams = Object.assign(
            this.authCredentials(),
            {
                method: "POST",
                body: JSON.stringify({
                    mode: "Manual",
                    duration_mins: 15
                })
            }
        );
        await fetch(`${this.apiBaseUrl}/api/v2/participants/${this.participantId}/messaging_mode_session`, requestParams);

        // reload participant state including messaging mode and conversations
        return this.loadMessages();
    };

    async disableManualMode() {
        const requestParams = Object.assign(
            this.authCredentials(),
            {
                method: "PATCH",
                body: JSON.stringify([
                    {op: "end"}
                ])
            }
        );

        await fetch(`${this.apiBaseUrl}/api/v2/participants/${this.participantId}/messaging_mode_session`, requestParams);
        // reload participant state including messaging mode and conversations
        return this.loadMessages();
    }



    async fetchMessages(params, update = true) {
        let auth = this.authCredentials();
        let requestParams = Object.assign(auth, {
            method: "GET"
        });

        let search = new URLSearchParams(Object.assign({
            study_id: this.studyId,
            participant_id: this.participantId,
            order_by: 'desc(id)',
            per_page: this.meta.pageSize
        }, params));

        let res = await fetch(`${this.apiBaseUrl}/api/v2/text_messages?` + search, requestParams);

        if (!res.ok) {
            throw new Error("womp");
        }

        let messages = (await res.json()).data;
        return this.pullMessagesFromData(messages, update);
    }



    pullMessagesFromData(messages, update = true) {
        if (update) {
            // Our API call finds items updated after the lastUpdated, so if the lastUpdated matched the updated_at
            // of a text we wouldn't get it. Move the search back by a second to account for that
            this.meta.lastUpdated = dayjs().subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss');
        }

        if (messages.length) {
            let newMessages = messages.reduce((accumulator, text) => {
                if (!this.meta.oldest || text.created_at < this.meta.oldest) {
                    this.meta.oldest = text.created_at;
                }
                return {...accumulator, [text.id]: text};
            }, {});
            this.messagesObj = Object.assign({}, this.messagesObj, newMessages)
        }
    }



    async loadMessages() {
        if (this.loading.initial) {
            return false;
        }
        this.loading.initial = true;
        await this.loadMessagesViaParticipantApi(`limit(${this.meta.pageSize})`);
        this.loading.initial = false;
    }



    async poll() {
        if (this.loading.polling) {
            return false;
        }

        this.loading.polling = true;
        await this.loadMessagesViaParticipantApi(`updatedAfter(${this.meta.lastUpdated})`)
        this.loading.polling = false;
    }



    async loadMessagesViaParticipantApi(textMessageCriteria) {
        // use the participants/support_partners endpoint for the initial load and when polling, so we get info on timezone, conversations,
        // and messaging mode
        let auth = this.authCredentials();
        let requestParams = Object.assign(auth, {
            method: "GET"
        });
        const includes = [
            `text_messages:${textMessageCriteria}`,
            'messaging_mode_session',
            'current_conversation',
        ];
        const url = `${this.apiBaseUrl}/api/v2/${this.resource}/${this.participantId}?include=${includes.join(',')}`;
        let res = await fetch(url, requestParams);
        if (!res.ok) {
            throw new Error("womp");
        }
        const ppt = (await res.json()).data;
        inboxHelper.setTimezone(ppt?.time_zone_name ?? "America/New_York");
        manualModeHelper.setCurrentSession(ppt?.messaging_mode_session);
        manualModeHelper.setCurrentConversation(ppt?.current_conversation);
        this.pullMessagesFromData(ppt.text_messages, true);

    }



    async loadOlder() {
        if (this.loading.older) {
            return false;
        }

        let params = {
            created_at: 'beforeOrEqual(' + this.meta.oldest + ')',
        };

        this.loading.older = true;
        await this.fetchMessages(params, false);
        this.loading.older = false;
    }


    async sendMessage(message, imageUrl) {
        if (this.loading.send) {
            return false;
        }
        let body = {
            message_text: message,
            media_url: imageUrl,
            force: true
        }

        let auth = this.authCredentials();
        let requestParams = Object.assign(auth, {
            method: "POST",
            body: JSON.stringify(body)
        });

        this.loading.send = true;
        let res = await fetch(`${this.apiBaseUrl}/api/v2/${this.resource}/${this.participantId}/text_messages`, requestParams);
        if (!res.ok) {
            this.loading.older = false;
            throw new Error("womp");
        }
        let text = (await res.json()).data;
        let obj = {};
        obj[text.id] = text;

        this.deselectMessage();
        this.messagesObj = Object.assign({}, this.messagesObj, obj);
        this.loading.send = false;
    }

    async sendSuggestedMessage(message, imageUrl) {
        let body = [
            {
                op: 'replace',
                path: '/final',
                value: message
            }
        ];
        let auth = this.authCredentials();
        let requestParams = Object.assign(auth, {
            method: "PATCH",
            body: JSON.stringify(body)
        });

        let res = await fetch(`${this.apiBaseUrl}/api/v2/ai_response_requests/${this.aiGeneratedResponse.id}`, requestParams);
        if (!res.ok) {
            this.loading.older = false;
            throw new Error("womp");
        }

        //once we've updated the AiResponseReqeust we can generate/send the text message
        await this.sendMessage(message, imageUrl);
        this.aiGeneratedResponse = null;
        this.deselectMessage();
    }

    async rejectSuggestedMessage(rejectComment) {
        let body = [
            {
                op: 'replace',
                path: '/review',
                value: 'Rejected'
            },
            {
                op: 'replace',
                path: '/comment',
                value: rejectComment
            },
        ];
        let auth = this.authCredentials();
        let requestParams = Object.assign(auth, {
            method: "PATCH",
            body: JSON.stringify(body)
        });

        let res = await fetch(`${this.apiBaseUrl}/api/v2/ai_response_requests/${this.aiGeneratedResponse.id}`, requestParams);
        if (!res.ok) {
            this.loading.older = false;
            throw new Error("womp");
        }

        this.aiGeneratedResponse = null;
        this.deselectMessage();
    }
    async refreshSuggestedMessage() {
        this.loading.refreshResponse = true;
        let body = [
            {
                op: 'replace',
                path: '/review',
                value: 'Refreshed'
            }
        ];
        let auth = this.authCredentials();
        let requestParams = Object.assign(auth, {
            method: "PATCH",
            body: JSON.stringify(body)
        });

        let res = await fetch(`${this.apiBaseUrl}/api/v2/ai_response_requests/${this.aiGeneratedResponse.id}`, requestParams);
        if (!res.ok) {
            this.loading.older = false;
            throw new Error("womp");
        }

        await this.suggestResponse();
        this.loading.refreshResponse = false;
    }
    selectMessage(msg) {
        this.selectedMessage = msg;
    };

    deselectMessage() {
        this.selectedMessage = null;
    };

    async suggestResponse() {
        if (this.loading.suggestResponse) {
            return false;
        }

        if (!this.selectedMessage) {
            return false;
        }

        let body = {
            input: this.selectedMessage.message_text,
            participant_id: this.participantId
        }

        let auth = this.authCredentials();
        let requestParams = Object.assign(auth, {
            method: "POST",
            body: JSON.stringify(body)
        });

        this.loading.suggestResponse = true;
        let res = await fetch(`${this.apiBaseUrl}/api/v2/ai_response_requests`, requestParams);
        if (!res.ok) {
            this.loading.suggestResponse = false;
            throw new Error("womp");
        }
        this.aiGeneratedResponse = (await res.json()).data;
        this.loading.suggestResponse = false;
    }
}

export default InboxStore;
