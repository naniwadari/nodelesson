<template>
  <div id="app">
    <MsgList v-for="list in lists" :key="list.id" :list="list" />
    <input type="text" @keyup.enter="post" />
    <p>--------------------</p>
    <HelloWorld />
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
  lists: IMsgList[] = createInitialLists();
  MsgCreatedCount = 2;

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
    const obj: object = new Function("return " + response.config.data)();
    console.log(obj);
    this.lists.push(obj);
    ++this.MsgCreatedCount;
  }
}
</script>

<style></style>
