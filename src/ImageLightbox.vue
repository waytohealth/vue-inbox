<template>
  <b-modal
    id="image-lightbox"
    :visible="value"
    centered
    hide-footer
    ok-only
    size="lg"
    ok-title="Close"
    lazy
    body-class="d-flex justify-content-center"
    @change="$emit('update:modelValue', $event)"
  >
    <template #modal-header>
      <b-button :disabled="disablePreviousButton">
        Prev
      </b-button>
      <b-button>
        close
      </b-button>
      <b-button :disabled="disableNextButton">
        next
      </b-button>
    </template>
    <LazyImage
      v-if="value"
      :store="store"
      image-class="modal-img"
      :url="imageUrl"
    />
  </b-modal>
</template>
<script>
import LazyImage from "./components/LazyImage"

export default {
  name: 'ImageLightbox',
  components: {
    LazyImage
  },
  props: {
    msgId: {
      type: Number,
      required: true,
    },
    imageIndex: {
      type: Number,
      required: true,
    },
    store: {
      type: Object,
      required: true,
    },
    value: {
      type: Boolean,
      required: true
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
      return output;
    },
    firstImage() {
      return this.images[0];
    },
    lastImage() {
      return this.images[this.images.length - 1];
    },
    disablePreviousButton() {
      return this.msgId === this.firstImage.msgId
        && this.imageIndex === this.firstImage.imageIndex;
    },
    disableNextButton() {
      return this.msgId === this.lastImage.msgId
        && this.imageIndex === this.lastImage.imageIndex;
    },
    imageUrl() {
      return this.store.apiBaseUrl + "/api/v2/text_messages/" + this.msgId + "/image/" + this.imageIndex;
    }
  },
}
</script>
