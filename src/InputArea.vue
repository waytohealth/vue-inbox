<template>
  <textarea
    :value="value"
    rows="2"
    cols="30"
    class="form-control"
    :disabled="disabled"
    @input="onInput"
  />
</template>
<script>
export default {
  name: 'InputArea',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onInput(event) {
      // debugger;
      this.resizeTextarea(event);
      this.$emit('input', event.target.value);
    },
    resizeTextarea(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },
  }
}
</script>
<style scoped>

textarea {
  resize: none;
}

</style>