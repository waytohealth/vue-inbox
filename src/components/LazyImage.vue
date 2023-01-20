<template>
  <div>
    <img
      v-if="src"
      :class="imageClass"
      :src="src"
    >
    <div v-else :class="imageClass">
      <b-spinner variant="primary" label="Spinning" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LazyImage",
  props: {
    store: {
      type: Object,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    imageClass: {
      type: String,
      default: 'inbox-img'
    }
  },
  data() {
    return {
      src: null
    };
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
</style>