<template>
  <div>
    <textarea rows="4" cols="30" class="form-control" v-model="textContent"></textarea>
    <input type="submit" value="Send SMS Message" class="btn btn-primary" v-on:click="sendMessage">
  </div>
</template>

<script>
import {useMessageStore} from "../stores/message";
export default {
  name: "InboxInput",
  methods: {
    async sendMessage() {
      console.log("Content: " + this.textContent);
      if (this.textContent.length) {
        const messageStore = useMessageStore();
        await messageStore.sendMessage(this.textContent);
        this.textContent = "";
      }
    }
  },
  data() {
    return {
      loading: false,
      textContent: ""
    }
  }
}
</script>

<style scoped>
.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #6c6f76;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
textarea.form-control {
  height: auto;
}

.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

.btn-primary {
  color: #fff;
  background-color: #01256e;
  border-color: #011c55;
}
</style>