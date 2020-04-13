<template>
  <div>
    {{ list.id }}
    {{ list.text }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IMsgList } from "../types";

@Component
export default class MsgList extends Vue {
  @Prop({ type: Object, required: true })
  list!: IMsgList;
}
</script>

<style lang="scss"></style>
