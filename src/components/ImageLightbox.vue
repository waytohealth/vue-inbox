<template>
  <b-modal
    id="image-lightbox"
    :visible="value"
    centered
    hide-footer
    size="lg"
    lazy
    body-class="d-flex justify-content-center"
    :title="sentTime"
    :title-class="'text-center w-100'"
    @change="$emit('input', $event)"
  >
    <LazyImage
      v-if="value"
      :key="`${msgId}_${imageIndex}`"
      :store="store"
      image-class="modal-img"
      :url="store.getImageUrl(msgId, imageIndex)"
    />
    <span
      v-if="showPreviousImageButton"
      id="prev-btn"
      @click="previousImage"
    >❮</span>
    <span
      v-if="showNextImageButton"
      id="next-btn"
      @click="nextImage"
    >❯</span>
  </b-modal>
</template>

<script>
import LazyImage from "@/components/LazyImage.vue";
import inboxHelper from '../helpers/inbox';

export default {
  name: "ImageLightbox",
  components: {
    LazyImage
  },
  props: {
    store: {
      type: Object,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      msgId: null,
      imageIndex: null,
      reverseDirection: false,
    }
  },
  computed: {
    images() {
      const output = [];
      Object.values(this.store.messagesObj).forEach(msg => {
        msg.media.forEach((media, imageIndex) => {
          output.push({
            msgId: msg.id,
            imageIndex: imageIndex
          })
        });
      })
      return this.reverseDirection ? output.reverse() : output;
    },
    sentTime() {
      const msg = this.store.messagesObj[this.msgId];
      if (msg) {
        return inboxHelper.imageDetailTime(msg);
      } else {
        return '';
      }
    },
    firstImage() {
      return this.images[0];
    },
    lastImage() {
      return this.images[this.images.length - 1];
    },
    showPreviousImageButton() {
      if (!this.firstImage) {
        return false;
      }
      return this.msgId !== this.firstImage.msgId
        || this.imageIndex !== this.firstImage.imageIndex;
    },
    showNextImageButton() {
      if (!this.lastImage) {
        return false;
      }
      return this.msgId !== this.lastImage.msgId
        || this.imageIndex !== this.lastImage.imageIndex;
    },
  },
  methods: {
    open(msgId, imageIndex, reverseDirection) {
      // Called from parent component
      this.msgId = msgId;
      this.imageIndex = imageIndex;
      this.reverseDirection = reverseDirection;
    },
    previousImage() {
      const x = this.images.findIndex(item =>
        item.msgId === this.msgId
        && item.imageIndex === this.imageIndex
      );
      if (x <= 0) {
        return;
      }
      this.msgId = this.images[x - 1].msgId;
      this.imageIndex = this.images[x - 1].imageIndex;
    },
    nextImage() {
      const x = this.images.findIndex(item =>
        item.msgId === this.msgId
        && item.imageIndex === this.imageIndex
      );
      if (x >= this.images.length - 1) {
        return;
      }
      this.msgId = this.images[x + 1].msgId;
      this.imageIndex = this.images[x + 1].imageIndex;
    },
  }
}
</script>

<style scoped>

#prev-btn,
#next-btn {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -50px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  transition: 0.6s ease;
  user-select: none;
  -webkit-user-select: none;
  opacity: 0.3;
  background-color: #000000;
}

#prev-btn {
  left: 0;
  border-radius: 3px 0 0 3px;
}

#next-btn {
  right: 0;
  border-radius: 0 3px 3px 0;
}
#prev-btn:hover,
#next-btn:hover {
  opacity: 0.8;
}

</style>