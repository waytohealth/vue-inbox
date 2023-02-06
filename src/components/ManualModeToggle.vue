<template>
  <div class="mt-2">
    <ManualModeWarningModal :visible="showWarningModal" @ok="store.enableManualMode()" />
    <b-form-checkbox
      :checked="!manualModeActive"
      switch
      @change="toggleManualMode"
    >
      Automated Messaging Mode
    </b-form-checkbox>
    <div :class="manualModeActive ? 'alert alert-warning' : 'alert alert-success'">
      <div v-if="manualModeActive">
        <strong>All automated text message processing is temporarily disabled</strong>, including conversations
        (scheduled or ongoing), auto-responders, and incidents. Automated messaging mode will resume at
        {{ manualModeExpiration }}.
      </div>
      <div v-else-if="isActiveConversation">
        {{ activeConversationName }} conversation in progress until {{ activeConversationExpiration }}. Disabling
        "Automated Messaging Mode" will stop this conversation and any automated responses.
      </div>
      <div v-else>
        Any incoming texts from this participant will be processed by the study's configured message handlers.
      </div>
    </div>
  </div>
</template>

<script>
import ManualModeWarningModal from "./ManualModeWarningModal.vue";

export default {
  name: "ManualModeToggle",
  components: {
    ManualModeWarningModal
  },
  props: {
    store: {
      type: Object,
      required: true
    },

  },
  data() {
    // These are all potentially going to move to the store
    return {
      manualModeActive: false,
      currentModeName: 'Manual',
      isActiveConversation: false,
      activeConversationName: 'Survey',
      activeConversationExpiration: '3:12:11 PM EDT',
      manualModeExpiration: '5:12:11 PM EDT',
      showWarningModal: false,
    }
  },
  methods: {
    toggleManualMode(val) {
      const mode = val ? 'Automated' : 'Manual';
      if (mode === 'Manual') {
        // reset it back until they confirm
        this.manualModeActive = false;
        this.showWarningModal = true;
      } else {
        this.store.disableManualMode();
        this.manualModeActive = false; // TODO move this into the store
      }
    }
  }
}
</script>
