<template>
  <div class="list">
    <Cross @click="removeMsg" />
    <ul class="flex">
      <li class="msg-id">{{ list.id }}</li>
      <li
        class="msg-text"
        :contenteditable="contenteditable"
        @click="onClick"
        @keypress.enter="updateMsg"
        @blur="onBlur"
      >
        {{ list.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, PropSync } from "vue-property-decorator";
import Cross from "./Cross.vue";
import { IMsg } from "../types";

@Component({
  components: {
    Cross
  }
})
export default class MsgList extends Vue {
  @Prop({ type: Object, required: true })
  list!: IMsg;

  @PropSync("msgText", { type: String, required: true })
  syncedMsgText!: IMsg["text"];

  contenteditable = false;

  onClick(event: MouseEvent & { currentTarget: HTMLDivElement }): void {
    this.contenteditable = true;
    event.currentTarget.focus();
  }

  @Emit()
  updateMsg(event: KeyboardEvent & { currentTarget: HTMLDivElement }) {
    const msg = this.list;
    msg.text = event.currentTarget.innerText;
    event.currentTarget.blur(); //要素からフォーカスを外す
    return msg;
  }

  onBlur(event: FocusEvent & { currentTarget: HTMLDivElement }): void {
    this.contenteditable = false;
  }

  @Emit()
  removeMsg(): number {
    return this.list.id;
  }
}
</script>

<style lang="scss">
.list {
  width: 300px;
  position: relative;
  border-bottom: 1px dotted #000;
}

.flex {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  .msg-id {
    width: 30px;
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
  }
  .msg-text {
    width: calc(100% - 46px);
  }
}
</style>
