<template>
  <div>
    <img
      v-if="src"
      class="inbox-img"
      :src="src"
    >
    <div v-else class="inbox-img">
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
</style>