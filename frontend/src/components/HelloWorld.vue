<template>
  <div>
    <input type="text" name="text" v-model="text" />
    <br />
    <button @click="post" type="submit">post</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import Methods from "../api/methods";
import { AxiosResponse } from "axios";

@Component
export default class HelloWorld extends Vue {
  text: string = "";

  @Emit()
  async post() {
    const sampletxt = { text: this.text };
    const response = await Methods.Posting({ sampletxt });
    const txt = response.config.data;
    console.log(txt);
  }
}
</script>
