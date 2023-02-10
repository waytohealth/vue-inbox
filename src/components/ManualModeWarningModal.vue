<template>
  <b-modal
    title="WARNING!"
    :visible="visible"
    v-on="$listeners"
  >
    <p><strong>You are about to disable automated messaging for this participant.</strong></p>
    <p>By disabling automated messaging:</p>
    <ul>
      <li>Any open conversations will be stopped</li>
      <li>Scheduled text messages and conversations will not be sent to the participant</li>
      <li>Text messages sent via logic will not be sent to the participants</li>
      <li>Incoming text messages from the participant will not be processed by configured Responses</li>
      <li>
        Incidents that would be created if an incoming message triggered a configured Response will not be created
      </li>
    </ul>
    <p>Automated messaging will remain disabled until manually re-enabled, or 15 minutes of inactivity.</p>
    <p>
      <strong>By clicking "OK", you are accepting responsibility for the above operations normally performed by the
        system.</strong>
    </p>
  </b-modal>
</template>

<script>
export default {
  name: "ManualModeWarningModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  }
}
</script>
