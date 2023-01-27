<template>
  <div class="inbox-component">
    <p>All texts are displayed in the participant's current time zone: {{ inboxHelper.getFriendlyTimezoneName() }}</p>
    <div>
      <div class="inbox clearfix">
        <div v-if="store.loading.older" class="text-center">
          <b-spinner variant="primary" label="Spinning" />
        </div>
        <div v-for="(msgs, date) in messagesByDate" :key="date">
          <div class="date">
            {{ inboxHelper.formatDate(date) }}
          </div>

          <div v-for="msg in msgs" :key="msg.id">
            <div v-if="msg.sender" class="sender">
              {{ msg.sender }}
            </div>
            <div class="message" :class="inboxHelper.messageClasses(msg)">
              <span
                v-b-tooltip.hover
                class="time"
                :title="inboxHelper.tooltipTime(msg)"
              >{{ inboxHelper.messageTime(msg) }}</span>
              <b-icon
                :id="`icon-${msg.id}`"
                class="status-icon"
                :icon="getIconForStatus(inboxHelper.statusType(msg)).icon"
                :variant="getIconForStatus(inboxHelper.statusType(msg)).variant"
              />
              <b-popover
                :target="`icon-${msg.id}`"
                title="Text Message Details"
                triggers="click blur"
                :placement="msg.direction === 'inbound' ? 'right' : 'left'"
              >
                <template #title>
                  Text Message Details
                </template>
                <strong>From:</strong> {{ inboxHelper.formatNumber(msg.from_number) }}<br>
                <strong>To:</strong> {{ inboxHelper.formatNumber(msg.to_number) }}<br>
                <strong>Status:</strong> {{ inboxHelper.messageStatus(msg) }}<br>
                <strong>Sent:</strong> {{ inboxHelper.messageDetailTime(msg) }}
              </b-popover>
              {{ msg.message_text }}
              <ul v-if="msg.media.length > 0" class="list-inline">
                <li
                  v-for="(media, idx) in msg.media"
                  :key="media.sid"
                  class="cursor-pointer"
                >
                  <LazyImage
                    :store="store"
                    :url="store.getImageUrl(msg.id, idx)"
                    @click.native="openImageLightbox(msg.id, idx)"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ImageLightbox
      ref="imageLightbox"
      v-model="showImageLightbox"
      :store="store"
    />

    <div>
      <slot
        name="imagePicker"
        :set-image-url="setImageUrl"
        :on-close="() => showImageUploader = false"
        :is-open="showImageUploader"
      />
      <InputArea
        v-model="textContent"
        :disabled="store.loading.send"
        :image-upload-enabled="imageUploadEnabled"
        @openImageUpload="showImageUploader = true"
      />
      <p v-if="imageUrl">
        Will include image attachment of <code>{{ imageUrl }}</code>
      </p>
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
    </div>
  </div>
</template>

<script>

import store from './stores/inbox';
import styles from './stores/styles';
import inboxHelper from './helpers/inbox';
import LazyImage from "./components/LazyImage";
import ImageLightbox from "@/components/ImageLightbox.vue";
import InputArea from "@/InputArea.vue";

export default {
  name: "InboxComponent",
  components: {
    InputArea,
    ImageLightbox,
    LazyImage
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
    imageUploadEnabled: {
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
      store: store,
      inboxHelper: inboxHelper,
      textContent: "",
      imageUrl: "",
      showImageUploader: false,
      showImageLightbox: false,
    }
  },
  computed: {
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
    latestMessageId() {
      return Math.max(...Object.keys(this.store.messagesObj));
    }
  },
  watch: {
    latestMessageId() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
  async created() {
    this.store.apiBaseUrl = this.apiBaseUrl;
    this.store.participantId = this.participantId;
    this.store.studyId = this.studyId;
    this.store.auth = this.auth;

    this.loading = true;
    this.store.loadMessages()
      .then(() => {
        this.loading = false;
        this.scrollToBottom();
      }).catch((e) => {
      // TODO: proper error handling
      console.log(e);
      this.loading = false;
    });
  },
  mounted() {
    // Only scroll on first mount - if we e.g. switch back and forth between tabs, on subsequent mounts
    // it should stay where we were
    if (!this.scrolled) {
      this.scrollToBottom();
      this.scrolled = true;
    }
    this.handleTop();
    // this.poll();
  },
  methods: {
    setImageUrl(url) {
      this.imageUrl = url;
    },
    openImageUpload() {
      this.showImageUploader = true;
    },
    openImageLightbox(msgId, imageIndex) {
      this.showImageLightbox = true;
      this.$refs.imageLightbox.open(msgId, imageIndex);
    },
    scrollToBottom() {
      const el = this.$el.querySelector('.inbox');
      if (el.scrollTo) {
        el.scrollTo({top: el.scrollHeight, behavior: 'smooth'});
      } else {
        // IE fallback
        el.scrollTop = el.scrollHeight;
      }
    },
    handleTop() {
      let inboxDiv = this.$el?.querySelector('.inbox');
      inboxDiv.onscroll = () => {
        if (inboxDiv) {
          if (inboxDiv.scrollTop === 0) {
            store.loadOlder();
          }
        }
      }
    },
    async sendMessage() {
      if (this.textContent.length) {
        await this.store.sendMessage(this.textContent);
        this.scrollToBottom();
        this.textContent = "";
      }
    },
    poll() {
      setTimeout(() => {
        this.store.poll();
        this.poll()
      }, 10000)
    },
    getIconForStatus(status) {
      switch (status) {
        case "success":
          return {
            icon: 'check-lg',
            variant: 'success',
          }
        case "failure":
          return {
            icon: 'exclamation-triangle-fill',
            variant: 'danger',
          }
        case "unknown":
          return {
            icon: 'info-circle-fill',
            variant: 'info',
          }
      }
    }
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

.date {
  clear: both;
  font-size: 1.1em;
  color: gray;
  text-align: center;
}

.message {
  position: relative;
  display: inline-block;
  min-width: 150px;
  max-width: 450px;
  padding: 10px 18px;
  clear: both;
  vertical-align: top;
  border-radius: 5px;
  -webkit-box-shadow: 0 0 6px #b2b2b2;
  box-shadow: 0 0 6px #b2b2b2;
}

div.sender {
  float: right;
  margin: 0 20px 0 0;
  clear: both;
  font-size: 12px;
  color: #6c6f76;
}

.inbound {
  float: left;
  margin: 5px 45px 5px 20px;
  background-color: #bdf9bd;
}

.inbound::before {
  left: -9px;
  background-color: #bdf9bd;
  -webkit-box-shadow: -2px 2px 2px 0 rgba(178, 178, 178, .4);
  box-shadow: -2px 2px 2px 0 rgba(178, 178, 178, .4);
}

.message::before {
  position: absolute;
  top: 11px;
  display: block;
  width: 20px;
  height: 16px;
  content: "\00a0";
  -webkit-transform: rotate(29deg) skew(-35deg);
  -moz-transform: rotate(29deg) skew(-35deg);
  -ms-transform: rotate(29deg) skew(-35deg);
  -o-transform: rotate(29deg) skew(-35deg);
  transform: rotate(29deg) skew(-35deg);
}

.outbound {
  float: right;
  margin: 5px 20px 5px 45px;
}

.outbound::before {
  right: -9px;
  -webkit-box-shadow: 2px -2px 2px 0 rgb(178 178 178 / 40%);
  box-shadow: 2px -2px 2px 0 rgb(178 178 178 / 40%);
}

.outbound.automated, .outbound.automated::before {
  background-color: #e0f1ff;
}

.outbound.manual, .outbound.manual::before {
  background-color: #badfff;
}

.time {
  float: right;
  margin: 0 3px 0;
  color: gray;
}

.status-icon {
  cursor: pointer;
}

.cursor-pointer {
  cursor: pointer;
}
</style>