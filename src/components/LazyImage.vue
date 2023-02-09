<template>
  <div v-if="loading" :class="imageClass">
    <b-spinner variant="primary" label="Spinning" />
  </div>
  <div v-else>
    <div
      v-if="context==='inbox'"
      class="inbox-img"
      :style="{'background-image': `url(${src})`}"
    />
    <img
      v-else
      :src="src"
      :class="imageClass"
      alt="Image sent/received by text message"
    >
  </div>
</template>

<script>
export default {
  name: "LazyImage",
  props: {
    context: {
      type: String,
      validator(value) {
        // context must be either gallery, modal, or inbox
        return ['gallery', 'modal', 'inbox'].includes(value)
      },
      required: true
    },
    store: {
      type: Object,
      required: true
    },
    url: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      src: null
    };
  },
  computed: {
    loading() {
      return this.src === null;
    },
    imageClass() {
      return `${this.context}-img`;
    },
    style() {
      return {'background-image': `url(${this.src})`}
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.src = await this.store.fetchImage(this.url)
    }
  }
}
</script>

<style scoped>
.inbox-img {
  width: 200px;
  height: 200px;
  margin: 20px 0;
  text-align: center;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  -webkit-background-size: cover;
  background-size: cover;
}

.modal-img {
  text-align: center;
  max-width: 100%;
  max-height: 80vh;
}

.gallery-img {
  max-width: 100%;
  margin: 10px 0;
}
</style>