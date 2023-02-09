<template>
  <div>
    <div v-if="showLoadMore" class="text-center">
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
            :icon="inboxHelper.getIconForStatus(inboxHelper.statusType(msg)).icon"
            :variant="inboxHelper.getIconForStatus(inboxHelper.statusType(msg)).variant"
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
                context="inbox"
                :store="store"
                :url="store.getImageUrl(msg.id, idx)"
                @click.native="$emit('openImageLightbox', msg.id, idx)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImage from "@/components/LazyImage.vue";

export default {
  name: "GalleryView",
  components: {
    LazyImage
  },
  props: {
    messagesByDate: {
      type: Object,
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

</style>
