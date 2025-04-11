<template>
  <div class="inbox-component">
    <div class="float-right">
      <b-form-checkbox
        v-model="galleryView"
        class="float-right mr-2"
        switch
      >
        Media View
      </b-form-checkbox>
    </div>
    <p>
      All texts are displayed in the participant's current time zone: {{ inboxHelper.getFriendlyTimezoneName() }}
    </p>
    <div>
      <div class="inbox clearfix">
        <GalleryView
          v-if="galleryView"
          :messages-with-images="messagesWithImages"
          :store="store"
          :inbox-helper="inboxHelper"
          :show-load-more="store.loading.older"
          @openImageLightbox="openImageLightbox"
        />
        <MessageView
          v-else
          :messages-by-date="messagesByDate"
          :inbox-helper="inboxHelper"
          :store="store"
          :show-load-more="store.loading.older"
          @openImageLightbox="openImageLightbox"
          @suggestResponse="suggestResponse"
        />
      </div>
    </div>
    <ImageLightbox
      ref="imageLightbox"
      v-model="showImageLightbox"
      :store="store"
    />
    <ManualModeToggle
      v-if="manualModeEnabled"
      :store="store"
      :helper="manualModeHelper"
    />
    <AiResponseRequestRejectModal
        :store="store"
        @submit="rejectSuggestedResponse"
    />
    <div>
      <slot
        name="imagePicker"
        :attach-image="attachImage"
        :on-close="() => showImageUploader = false"
        :is-open="showImageUploader"
      />
      <InputArea
        v-model="textContent"
        :disabled="disableTextInput"
        :show-image-upload-invoker="imageUploadEnabled && !imageUrl"
        @openImageUpload="showImageUploader = true"
      />
      <div v-if="!store.aiGeneratedResponse" class="inbox-action-items">
        <div v-if="imageUrl">
          <h4>Attachments</h4>
          <ul class="list-unstyled">
            <li>
              <span class="filename">{{ imageName }}</span>
              <button
                class="btn btn-link"
                type="button"
                @click="removeAttachment"
              >
                <span class="fa fa-trash text-danger" />
                <span class="sr-only">Remove</span>
              </button>
            </li>
          </ul>
        </div>
        <input
          v-if="!store.loading.send"
          type="submit"
          value="Send SMS Message"
          :class="styleConfig.inboxSubmit"
          :disabled="store.loading.send"
          @click="sendMessage"
        >

        <div
            v-else
            :class="styleConfig.inboxSubmit"
            class="disabled"
        >
          Send SMS Message
          <b-spinner
              small
              variant="light"
              label="Spinning"
          />
        </div>

        <input
            v-if="aiSuggestionsEnabled && store.selectedMessage && !store.loading.suggestResponse"
            type="submit"
            value="Suggest Response"
            :class="[styleConfig.inboxSuggestResponse, 'suggest-response-button', {'selected': store.selectedMessage}]"
            :disabled="store.loading.suggestResponse"
            @click="suggestResponse"
        >
        <div
            v-else-if="aiSuggestionsEnabled && !store.selectedMessage || store.loading.suggestResponse"
            :class="[styleConfig.inboxSuggestResponse, 'suggest-response-button', {'selected': store.selectedMessage, 'loading': store.loading.suggestResponse}]"
        >
          Suggest Response
          <b-spinner v-if="store.loading.suggestResponse"
                     small
                     variant="light"
                     label="Spinning"
          />
        </div>
      </div>
      <div v-else class="inbox-action-items mt-1">
        <b-button variant="primary"
                  :disabled="store.loading.send"
                  @click="sendSuggestedResponse">
          <b-icon icon="hand-thumbs-up"/>
          Send
        </b-button>
        <b-button variant="danger"
                  :disabled="store.loading.send"
                  @click="openRejectCommentModal">
          <b-icon icon="hand-thumbs-down"/>
          Reject
        </b-button>
        <b-button variant="secondary"
                  :disabled="store.loading.send"
                  :class="{'refresh-button': true, 'selected': store.selectedMessage, 'loading': store.loading.refreshResponse}"
                  @click="refreshSuggestedResponse">
          <b-icon icon="recycle"/>
          Refresh
          <b-spinner v-if="store.loading.refreshResponse"
                     small
                     variant="light"
                     label="Spinning"
          />
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>

import InboxStore from "./stores/inbox";
import styles from './stores/styles';
import inboxHelper from './helpers/inbox';
import manualModeHelper from './helpers/manualMode';
import ImageLightbox from "./components/ImageLightbox.vue";
import InputArea from "./components/InputArea.vue";
import GalleryView from "./components/GalleryView.vue";
import MessageView from "./components/MessageView.vue";
import ManualModeToggle from "./components/ManualModeToggle.vue";
import AiResponseRequestRejectModal from "./components/AiResponseRequestRejectModal.vue";

export default {
  name: "InboxComponent",
  components: {
    ManualModeToggle,
    GalleryView,
    InputArea,
    ImageLightbox,
    MessageView,
    AiResponseRequestRejectModal
  },
  props: {
    auth: {
      type: Object,
      required: false,
      default() {
        return {
          method: "session",
          apiKey: ""
        }
      }
    },
    pollFrequencySeconds: {
      type: Number,
      required: false,
      default: 10,
    },
    apiBaseUrl: {
      type: String,
      required: true
    },
    studyId: {
      type: Number,
      required: true
    },
    participantId: {
      type: Number,
      required: true
    },
    resource: {
      type: String,
      default: "participants",
      validator: function (value) {
        // The value must match one of these
        return ['participants', 'support_partners'].includes(value);
      },
    },
    imageUploadEnabled: {
      type: Boolean,
      default: false,
    },
    manualModeEnabled: {
      type: Boolean,
      default: false,
    },
    aiSuggestionsEnabled: {
      type: Boolean,
      default: false,
    },
    styles: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      scrolled: false,
      styleConfig: Object.assign(styles, this.styles),
      store: null,
      inboxHelper,
      manualModeHelper,
      textContent: "",
      imageUrl: "",
      imageName: "",
      showImageUploader: false,
      showImageLightbox: false,
      galleryView: false,
    }
  },
  computed: {
    disableTextInput() {
      return !!this.store.loading.send
          || !!this.store.loading.suggestResponse
          || !!this.store.loading.refreshResponse;
    },
    sortedMessages() {
      if (Object.keys(this.store.messagesObj).length > 0) {
        return this.inboxHelper.sortMessages(Object.values(this.store.messagesObj));
      }
      return [];
    },
    messagesByDate() {
      if (this.sortedMessages.length) {
        return this.sortedMessages.reduce(function (rv, x) {
          (rv[x['created_at'].split(" ")[0]] = rv[x['created_at'].split(" ")[0]] || []).push(x);
          return rv;
        }, {});
      }
      return [];
    },
    messagesWithImages() {
      return Object.values(this.store.messagesObj).filter(msg => msg.media.length > 0).reverse();
    },
    latestMessageId() {
      return Math.max(...Object.keys(this.store.messagesObj));
    }
  },
  watch: {
    latestMessageId() {
      this.$nextTick(() => {
        this.scrollToNewest('smooth');
      });
    },
    galleryView() {
      // scroll to newest when changing views
      this.$nextTick(() => {
        this.scrollToNewest();
      });
    }
  },
  async created() {
    this.store = new InboxStore(
      this.apiBaseUrl,
      this.participantId,
      this.resource,
      this.studyId,
      this.auth,
    );

    this.store.loadMessages()
      .then(() => {
        this.scrollToNewest();
      }).catch((e) => {
      // TODO: proper error handling
      console.log(e);
    });
  },
  mounted() {
    // Only scroll on first mount - if we e.g. switch back and forth between tabs, on subsequent mounts
    // it should stay where we were
    if (!this.scrolled) {
      this.scrollToNewest();
      this.scrolled = true;
    }
    this.handleLoadMore();
    this.poll();
  },
  methods: {
    attachImage(url, name = "Attachment") {
      this.imageUrl = url;
      this.imageName = name;
    },
    removeAttachment() {
      this.imageUrl = '';
      this.imageName = '';
    },
    openImageUpload() {
      this.showImageUploader = true;
    },
    openImageLightbox(msgId, imageIndex) {
      this.showImageLightbox = true;
      this.$refs.imageLightbox.open(msgId, imageIndex, this.galleryView);
    },
    openRejectCommentModal() {
      this.$bvModal.show('reject-comment-modal');
    },
    scrollToNewest(behavior = 'auto') {
      const el = this.$el.querySelector('.inbox');
      const scrollToOffset = this.galleryView ? 0 : el.scrollHeight;
      if (el.scrollTo) {
        el.scrollTo({top: scrollToOffset, behavior: behavior});
      } else {
        // IE fallback
        el.scrollTop = scrollToOffset;
      }
    },
    handleLoadMore() {
      let inboxDiv = this.$el?.querySelector('.inbox');
      inboxDiv.onscroll = () => {
        if (inboxDiv) {
          if (this.galleryView) {
            if (inboxDiv.scrollTop >= inboxDiv.scrollHeight - inboxDiv.clientHeight - 1) {
              this.store.loadOlder();
            }
          } else {
            if (inboxDiv.scrollTop === 0) {
              this.store.loadOlder();
            }
          }
        }
      }
    },
    async sendMessage() {
      if (this.textContent.length || this.imageUrl) {
        await this.store.sendMessage(this.textContent, this.imageUrl);
        this.scrollToNewest('smooth');
        this.textContent = "";
        this.imageUrl = '';
        this.imageName = '';
      }
    },
    async sendSuggestedResponse() {
      if (this.textContent.length && this.store.aiGeneratedResponse) {
        await this.store.sendSuggestedMessage(this.textContent, this.imageUrl);
        this.$el?.querySelector('.message-container.selected').classList.remove('selected');
        this.scrollToNewest('smooth');
        this.textContent = "";
        this.imageUrl = '';
        this.imageName = '';
      }
    },
    async rejectSuggestedResponse(comment) {
      if (this.store.aiGeneratedResponse) {
        await this.store.rejectSuggestedMessage(comment);
        this.$el?.querySelector('.message-container.selected').classList.remove('selected');
        this.textContent = "";
        this.imageUrl = '';
        this.imageName = '';
        this.$bvModal.hide('reject-comment-modal');
      }
    },
    async refreshSuggestedResponse() {
      await this.store.refreshSuggestedMessage();
      this.textContent = this.store.aiGeneratedResponse.response;
    },
    async suggestResponse() {
      await this.store.suggestResponse();
      this.textContent = this.store.aiGeneratedResponse.response;
    },
    poll() {
      setTimeout(() => {
        this.store.poll();
        this.poll()
      }, this.pollFrequencySeconds * 1000)
    },
  },
}
</script>

<style scoped>
.inbox {
  max-height: 60vh;
  min-height: 60vh;
  overflow-x: hidden;
  overflow-y: scroll;
  border-bottom: 2px solid rgba(0, 0, 0, .2);
}

@media print {
  .inbox {
    max-height: none;
    height: auto;
  }
}

::v-deep .time {
  float: right;
  margin: 0 3px 0;
  color: gray;
}

::v-deep .status-icon {
  float: left;
  cursor: pointer;
  margin: 0 3px 0;
}

::v-deep .cursor-pointer {
  cursor: pointer;
}

::v-deep .suggest-response-button {
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

::v-deep .suggest-response-button.selected {
  background: linear-gradient(135deg, 
    #6366f1 0%, 
    #8b5cf6 25%, 
    #d1d5db 50%, 
    #6366f1 75%, 
    #8b5cf6 100%
  );
  background-size: 400% 400%;
  color: white;
}

::v-deep .suggest-response-button.selected.loading {
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

::v-deep .refresh-button {
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

::v-deep .refresh-button.selected {
  background: linear-gradient(135deg, 
    #6366f1 0%, 
    #8b5cf6 25%, 
    #d1d5db 50%, 
    #6366f1 75%, 
    #8b5cf6 100%
  );
  background-size: 400% 400%;
  color: white;
}

::v-deep .refresh-button.selected.loading {
  animation: gradientShift 3s ease-in-out infinite;
}
</style>
