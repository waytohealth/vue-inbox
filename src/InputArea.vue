<template>
  <div class="wrapper">
    <textarea
      ref="textarea"
      :value="value"
      cols="30"
      class="form-control"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    />
    <button
      v-if="showImageUploadInvoker"
      class="image-upload-invoker"
      @click.stop="$emit('openImageUpload')"
    >
      <svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 fill-current text-grey"
      >
        <path d="M96 896a32 32 0 01-32-32V160a32 32 0 0132-32h832a32 32 0 0132 32v704a32 32 0 01-32 32H96zm315.52-228.48l-68.928-68.928a32 32 0 00-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 00-49.216 0L458.752 665.408a32 32 0 01-47.232 2.112zM256 384a96 96 0 10192.064-.064A96 96 0 00256 384z" />
      </svg>
    </button>

    <emoji-picker :search="search" @emoji="insertEmoji">
      <template #emoji-invoker="{ events: { click: clickEvent } }">
        <button
          class="emoji-invoker"
          @click.stop="clickEvent"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 fill-current text-grey"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
            />
          </svg>
        </button>
      </template>
      <template #emoji-picker="{ emojis, insert }">
        <div class="emoji-picker">
          <div class="emoji-picker__search">
            <input
              v-model="search"
              v-focus
              type="text"
            >
          </div>
          <div>
            <div v-for="(emojiGroup, category) in emojis" :key="category">
              <h5>{{ category }}</h5>
              <div class="emojis">
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  :title="emojiName"
                  @click="insert(emoji)"
                >{{ emoji }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </emoji-picker>
  </div>
</template>
<script>
import {EmojiPicker} from 'vue-emoji-picker'
import emojiRegex from "emoji-regex";

export default {
  name: 'InputArea',
  components: {
    EmojiPicker
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true
    },
    showImageUploadInvoker: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: '',
    }
  },
  watch: {
    value(newVal) {
      this.resizeTextarea(newVal);
    }
  },
  methods: {
    insertEmoji(emoji) {
      const textarea = this.$refs.textarea;
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const newValue = this.value.substring(0, startPos)
        + emoji
        + this.value.substring(endPos, this.value.length);
      this.$emit('input', newValue);
      textarea.focus();

      this.$nextTick(() => {
        textarea.selectionStart = textarea.selectionEnd = startPos + emoji.length
      });
    },
    resizeTextarea(newVal) {
      const textarea = this.$refs.textarea;
      const justEmojiRegex = new RegExp(`^((${emojiRegex().source})|[ \n])+$`)
      textarea.style.height = "auto"; // reset
      textarea.style.fontSize = justEmojiRegex.test(newVal) ? '1.8rem' : null;
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
  },

}
</script>
<style scoped>

textarea {
  resize: none;
}


/* Taken from https://codepen.io/DCzajkowski/pen/jzLzWp */

.wrapper {
  position: relative;
}

.emoji-invoker, .image-upload-invoker {
  position: absolute;
  top: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  background: transparent;
  border: 0;
}
.emoji-invoker {
  right: 0.5rem;
}
.image-upload-invoker {
  right: 2.5rem;
}

.emoji-invoker:hover, .image-upload-invoker:hover {
  transform: scale(1.1);
}

.emoji-invoker > svg, .image-upload-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  position: absolute;
  z-index: 1;
  border: 1px solid #ccc;
  width: 17rem;
  right: 0;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}

.emoji-picker__search {
  display: flex;
}

.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}

.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}

.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}

.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}

.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}

</style>