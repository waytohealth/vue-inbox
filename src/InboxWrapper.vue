<template>
  <div>
    <h1>Inbox</h1>
    <div class="inbox-wrapper">
      <InboxComponent
        :participant-id="participant_id"
        :study-id="studyId"
        :api-base-url="apiBaseUrl"
        :auth="auth"
        :image-upload-enabled="true"
        :poll-frequency-seconds="10"
        :manual-mode-enabled="true"
      >
        <template #imagePicker="{attachImage, isOpen, onClose}">
          <ImagePicker
            :is-open="isOpen"
            @input="attachImage"
            @closed="onClose"
          />
        </template>
      </InboxComponent>
    </div>
  </div>
</template>

<script>
import InboxComponent from "./InboxComponent";
import ImagePicker from "./ImagePicker.vue";

export default {
  name: "InboxWrapper",
  components: {
    ImagePicker,
    InboxComponent
  },
  data() {
    return {
      participant_id: 830828,
      studyId: 1,
      apiBaseUrl: "http://localhost",
      auth: {
        method: "key",
        apiKey: "MjQ1LDEwMywwLDkxLDEwOSw3MSwzMCwxNDAsMjE5LDIwLDE1OCw5NiwyNDMsMjAxLDE3NSwxNTY="
      }
    }
  }
}
</script>
<style>
.inbox-wrapper {
  border: 1px solid black;
  max-width: 800px;
  margin: auto 20px;
}
</style>