<template>
  <div id="app">
    <MsgList
      v-for="list in lists"
      :key="list.id"
      :list="list"
      :msgText.sync="list.text"
      @remove-msg="removeMsg"
      @update-msg="updateMsg"
    />
    <p>--------------------</p>
    <input type="text" @keyup.enter="postMsg" v-model="inputValue" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MsgList from "./components/MsgList.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Methods from "./api/methods";
import { AxiosResponse } from "axios";
import { IMsgList, IMsg } from "./types";
import { createInitialLists } from "./initialData";

@Component({
  components: {
    MsgList
  }
})
export default class App extends Vue {
  lists: IMsg[] = [];
  inputValue: string = "";

  public created() {
    this.getMsgList();
  }

  async getMsgList() {
    const response = await Methods.Getting();
    this.lists = response.data;
  }

  async postMsg(event: Event & { currentTarget: HTMLInputElement }) {
    const newMsg = {
      text: event.currentTarget.value
    };
    const response = await Methods.Posting(newMsg);
    this.lists.push(response.data);
    this.inputValue = "";
  }

  async updateMsg(msg: IMsg) {
    const msgIndex = this.lists.findIndex(list => list.id === msg.id);
    if (msgIndex === -1) return;
    const response = await Methods.patch(msg.id, msg);
  }

  async removeMsg(msgId: number) {
    const msgIndex = this.lists.findIndex(list => list.id === msgId);
    if (msgIndex === -1) return;
    const response = await Methods.delete(msgId);
    this.lists.splice(msgIndex, 1);
  }
}
</script>

<style></style>
