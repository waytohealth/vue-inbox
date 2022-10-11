<template>
  <div>
    <InboxComponent
      :participant-id="participant_id"
      :study-id="studyId"
      :api-base-url="apiBaseUrl"
      :auth="auth"
      />
  </div>
</template>

<script>
import InboxComponent from "./InboxComponent";
export default {
  name: "InboxWrapper",
  components: {
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