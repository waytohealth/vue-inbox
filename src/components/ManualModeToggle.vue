<template>
  <div class="mt-2">
    <ManualModeWarningModal :visible="showWarningModal" @ok="store.enableManualMode()" />
    <b-form-checkbox
      :checked="!helper.isManualModeActive"
      switch
      @change="toggleManualMode"
    >
      Automated Messaging Mode
    </b-form-checkbox>
    <div :class="helper.isManualModeActive ? 'alert alert-warning' : 'alert alert-success'">
      <div v-if="helper.isManualModeActive">
        <strong>All automated text message processing is temporarily disabled</strong>, including conversations
        (scheduled or ongoing), auto-responders, and incidents. Automated messaging mode will resume
        in <abbr v-b-tooltip :title="helper.manualModeExpiration">{{ helper.manualModeTimeRemaining }}</abbr>
      </div>
      <div v-else-if="helper.isConversationActive">
        <strong>{{ helper.conversationName }}</strong> conversation in progress until
        <strong>{{ helper.conversationExpiration }}</strong>. Disabling
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
    helper: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      showWarningModal: false,
    }
  },
  mounted() {
    // force updating for the sake of the relative timer which isn't easy to make reactive
    setInterval(() => {
        this.$forceUpdate();
    }, 30 * 1000);
  },
  methods: {
    toggleManualMode(val) {
      const mode = val ? 'Automated' : 'Manual';
      if (mode === 'Manual') {
        this.showWarningModal = true;
      } else {
        this.store.disableManualMode();
      }
    }
  }
}
</script>
