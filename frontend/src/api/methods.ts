import Api from "./index";
import { AxiosResponse } from "axios";

export default {
  Posting(item: Object) {
    return Api().post("/api", item);
  },

  Getting() {
    return Api().get("/api");
  }
};
