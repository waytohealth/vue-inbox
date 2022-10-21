<template>
  <div>
    <img class="inbox-img" v-if="src" :src="src"/>
    <div v-else class="inbox-img">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  name: "LazyImage",
  props: {
    store: {
      type: Object,
      reruired: true
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