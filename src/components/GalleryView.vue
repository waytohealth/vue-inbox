<template>
  <div class="container gallery-view">
    <div class="row row-cols-2 row-cols-md-4">
      <div
        v-for="msg in messagesWithImages"
        :key="msg.id"
        class="col mb-2"
      >
        <b-card class="h-100" body-class="p-0 p-sm-1 p-md-3">
          <span
            v-b-tooltip.hover
            class="time"
            :title="inboxHelper.messageDetailTime(msg)"
          >{{ inboxHelper.messageDate(msg) }}</span>
          <span class="status-icon">
            <b-icon
              :id="`icon-${msg.id}`"
              :icon="inboxHelper.getIconForStatus(inboxHelper.statusType(msg)).icon"
              :variant="inboxHelper.getIconForStatus(inboxHelper.statusType(msg)).variant"
            />
          </span>
          <b-popover
            :target="`icon-${msg.id}`"
            title="Text Message Details"
            triggers="click blur"
            placement="down"
          >
            <template #title>
              Text Message Details
            </template>
            <strong>From:</strong> {{ inboxHelper.formatNumber(msg.from_number) }}<br>
            <strong>To:</strong> {{ inboxHelper.formatNumber(msg.to_number) }}<br>
            <strong>Status:</strong> {{ inboxHelper.messageStatus(msg) }}<br>
            <strong>Sent:</strong> {{ inboxHelper.messageDetailTime(msg) }}
            <span v-if="msg.metadata">
              <br><strong>Metadata:</strong> {{ inboxHelper.messageMetadata(msg) }}
            </span>
          </b-popover>
          <ul class="list-inline">
            <li
              v-for="(media, idx) in msg.media"
              :key="media.sid"
              class="cursor-pointer"
            >
              <LazyImage
                :store="store"
                :url="store.getImageUrl(msg.id, idx)"
                context="gallery"
                @click.native="$emit('openImageLightbox', msg.id, idx)"
              />
            </li>
          </ul>
        </b-card>
      </div>
    </div>
    <div :class="{'invisible': !showLoadMore }" class="text-center">
      <b-spinner variant="primary" label="Spinning" />
    </div>
  </div>
</template>

<script>
import LazyImage from "./LazyImage.vue";

export default {
  name: "GalleryView",
  components: {
    LazyImage,
  },
  props: {
    messagesWithImages: {
      type: Array,
      required: true,
    },
    inboxHelper: {
      type: Object,
      required: true,
    },
    store: {
      type: Object,
      required: true
    },
    showLoadMore: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style scoped>
.gallery-view .col {
  padding: 0 5px;
}
</style>