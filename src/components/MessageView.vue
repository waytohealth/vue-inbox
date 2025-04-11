<template>
  <div>
    <div v-if="showLoadMore" class="text-center">
      <b-spinner variant="primary" label="Spinning" />
    </div>
    <div v-for="(msgs, date) in messagesByDate" :key="date">
      <div class="date">
        {{ inboxHelper.formatDate(date, false) }}
      </div>

      <div v-for="msg in msgs" :key="msg.id">
        <div v-if="msg.sender" class="sender">
          {{ msg.sender }}
        </div>
        <div class="message-container" @click="selectMessage($event, msg)">
          <div class="message" :class="inboxHelper.messageClasses(msg)">
            <span
              v-b-tooltip.hover
              class="time"
              :title="inboxHelper.tooltipTime(msg)"
            >{{ inboxHelper.messageTime(msg) }}</span>
            <span class="status-icon">
              <b-icon
                :id="`icon-${msg.id}`"
                :icon="inboxHelper.getIconForStatus(inboxHelper.statusType(msg)).icon"
                :variant="inboxHelper.getIconForStatus(inboxHelper.statusType(msg)).variant"
                :font-scale="inboxHelper.getIconForStatus(inboxHelper.statusType(msg)).scale"
              />
            </span>
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
              <span v-if="msg.metadata">
                <br><strong>Metadata:</strong> {{ inboxHelper.messageMetadata(msg) }}
              </span>
            </b-popover>
            <span
              :class="{'emojiOnly': isJustEmoji(msg.message_text)}"
              style="white-space: pre-wrap;"
            >{{ msg.message_text }}</span>

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
          <div 
            class="stars-container" 
            v-if="msg.direction === 'inbound' && store.selectedMessage && store.selectedMessage.id === msg.id"
            @click.stop="!store.loading.suggestResponse && $emit('suggestResponse')"
          >
            <b-icon 
              class="selected-icon" 
              icon="stars" 
              scale="2"
              :class="{'text-muted': store.loading.suggestResponse}"
            ></b-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImage from "./LazyImage.vue";
import {isJustEmoji} from "../helpers/emojiHelper";

export default {
  name: "GalleryView",
  components: {
    LazyImage
  },
  props: {
    messagesByDate: {
      type: [Object, Array],
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
  },
  data() {
    return {
      isJustEmoji
    };
  },
  methods: {
    selectMessage: function(event, msg) {
      if (msg.direction === 'inbound') {
        let previouslySelectedMessage = this.$el?.querySelector('.message.selected');

        if (previouslySelectedMessage) {
          previouslySelectedMessage.classList.remove('selected');
          this.store.deselectMessage();
        }

        if (previouslySelectedMessage !== event.currentTarget) {
          event.currentTarget.classList.add('selected');
          this.store.selectMessage(msg);
        }
      }
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

.emojiOnly {
  font-size: 1.8em;
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

.inbound:hover {
  box-shadow: 0px 0px 2px 20px rgba(0, 100, 0, .4);
}
.message-container.selected .inbound {
  box-shadow: 0px 0px 2px 20px rgba(190, 205, 175, .4);
}

.message-container.selected .stars-container {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: -10px;
  background: linear-gradient(135deg, 
    #6366f1 0%, 
    #8b5cf6 25%, 
    #d1d5db 50%, 
    #6366f1 75%, 
    #8b5cf6 100%
  );
  padding: 12px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 400% 400%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.message-container.selected .stars-container:hover:not(:has(.text-muted)) {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.message-container.selected .stars-container:has(.text-muted) {
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

.message-container.selected .selected-icon {
  color: white;
  font-size: 0.875rem;
  margin: 0;
  padding: 0;
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

.message-container {
  position: relative;
  display: inline-block;
}

</style>
