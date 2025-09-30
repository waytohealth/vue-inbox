<template>
  <b-modal
    id="reject-comment-modal"
    title="Reject AI Suggested Response"
  >
    <p><strong>Please select a reason for rejecting this response and click submit.</strong></p>
    <b-form-select v-model="rejectComment" :options="rejectOptions" />
    <b-form-input
      v-if="rejectComment === 'other'"
      v-model="otherValue"
      class="mt-2"
      placeholder="Enter reason for rejection"
    />
    <template #modal-footer="{ cancel }">
      <b-button
        size="sm"
        variant="success"
        @click="onSubmit"
      >
        Submit
      </b-button>
      <b-button
        size="sm"
        variant="danger"
        @click="cancel()"
      >
        Cancel
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "AiResponseRequestRejectModal",
  props: {
    store: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      rejectComment: null,
      otherValue: null,
      rejectOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'incorrect', text: 'The response is factually incorrect' },
        { value: 'incomplete', text: 'The response is incomplete' },
        { value: 'irrelevant', text: 'The response is irrelevant' },
        { value: 'other', text: 'Other' }
      ]
    }
  },
  methods: {
    async onSubmit() {
      let rejectComment = this.rejectComment;
      if (rejectComment === 'other') {
        rejectComment = this.otherValue;
      }
      this.$emit('submit', rejectComment);
    },
  }
}
</script>
