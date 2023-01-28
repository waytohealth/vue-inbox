<template>
  <div class="inbox-component">
    <p>
      All texts are displayed in the participant's current time zone: {{ inboxHelper.getFriendlyTimezoneName() }}
      <b-form-checkbox
        v-model="galleryView"
        class="float-right mr-2"
        switch
      >
        Media View
      </b-form-checkbox>
    </p>
    <div>
      <div class="inbox clearfix">
        <GalleryView
          v-if="galleryView"
          :messages-with-images="messagesWithImages"
          :store="store"
          :inbox-helper="inboxHelper"
          @openImageLightbox="openImageLightbox"
          :show-load-more="store.loading.older"
        />
        <MessageView
          v-else
          :messages-by-date="messagesByDate"
          :inbox-helper="inboxHelper"
          :store="store"
          @openImageLightbox="openImageLightbox"
          :show-load-more="store.loading.older"
        />
      </div>
    </div>
    <ImageLightbox
      ref="imageLightbox"
      v-model="showImageLightbox"
      :store="store"
    />

    <div>
      <InputArea
        v-model="textContent"
        :disabled="store.loading.send"
      />
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
import ImageLightbox from "./components/ImageLightbox.vue";
import InputArea from "./components/InputArea.vue";
import GalleryView from "./components/GalleryView.vue";
import MessageView from "./components/MessageView.vue";

export default {
  name: "InboxComponent",
  components: {
    GalleryView,
    InputArea,
    ImageLightbox,
    MessageView,
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
      showImageLightbox: false,
      galleryView: false,
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
        this.scrollToNewest();
      });
    },
    galleryView(newVal) {
      // scroll to newest when changing back to message view
      if (!newVal) {
        this.$nextTick(() => {
          this.scrollToNewest();
        });
      }
    }
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
        this.scrollToNewest();
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
      this.scrollToNewest();
      this.scrolled = true;
    }
    this.handleLoadMore();
    this.poll();
  },
  methods: {
    openImageLightbox(msgId, imageIndex) {
      this.showImageLightbox = true;
      this.$refs.imageLightbox.open(msgId, imageIndex, this.galleryView);
    },
    scrollToNewest() {
      const el = this.$el.querySelector('.inbox');
      const scrollToOffset = this.galleryView ? 0 : el.scrollHeight;
      if (el.scrollTo) {
        el.scrollTo({top: scrollToOffset, behavior: 'smooth'});
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
              store.loadOlder();
            }
          } else {
            if (inboxDiv.scrollTop === 0) {
              store.loadOlder();
            }
          }
        }
      }
    },
    async sendMessage() {
      if (this.textContent.length) {
        await this.store.sendMessage(this.textContent);
        this.scrollToNewest();
        this.textContent = "";
      }
    },
    poll() {
      setTimeout(() => {
        this.store.poll();
        this.poll()
      }, 10000)
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

>>> .time {
  float: right;
  margin: 0 3px 0;
  color: gray;
}

>>> .status-icon {
  cursor: pointer;
}

>>> .cursor-pointer {
  cursor: pointer;
}
</style>