import Api from "./index";
import { AxiosResponse } from "axios";

export default {
  Posting(item: Object) {
    return Api().post("/api", item);
  },

  Getting() {
    return Api().get("/api");
  },

  patch(id: number, item: Object) {
    return Api().patch(`/api/${id}`, item);
  },

  delete(id: number) {
    return Api().delete(`/api/${id}`);
  }
};
