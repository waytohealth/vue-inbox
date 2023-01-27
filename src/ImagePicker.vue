<template>
  <b-modal
    :visible="isOpen"
    centered
    @hidden="$emit('closed')"
  >
    <input
      v-model="imageUrl"
      type="url"
      class="form-control"
    >
    <button
      class="btn btn-outline-primary"
      @click="$emit('input', imageUrl)"
    >
      Set image URL
    </button>
  </b-modal>
</template>

<script>
export default {
  name: "ImagePicker",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  }
}
</script>

