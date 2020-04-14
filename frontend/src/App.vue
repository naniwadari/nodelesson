<template>
  <div id="app">
    <MsgList v-for="list in lists" :key="list.id" :list="list" />
    <p>--------------------</p>
    <input type="text" @keyup.enter="post" />
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
    MsgList,
    HelloWorld
  }
})
export default class App extends Vue {
  lists: IMsg[] = [];
  MsgCreatedCount = 2;

  public created() {
    this.getMsgList();
    console.log(this.lists);
  }

  async getMsgList() {
    const response = await Methods.Getting();
    this.lists = response.data;
  }

  addMsg(event: Event & { currentTarget: HTMLInputElement }): void {
    const newMsg = {
      id: this.MsgCreatedCount + 1,
      text: event.currentTarget.value
    };
    console.log(newMsg);
    this.lists.push(newMsg);
    ++this.MsgCreatedCount;
    event.currentTarget.value = "";
  }

  async post(event: Event & { currentTarget: HTMLInputElement }) {
    const newMsg = {
      id: this.MsgCreatedCount + 1,
      text: event.currentTarget.value
    };
    const response = await Methods.Posting(newMsg);
    const msg: IMsg = new Function("return " + response.config.data)();
    this.lists.push(msg);
    ++this.MsgCreatedCount;
  }
}
</script>

<style></style>
