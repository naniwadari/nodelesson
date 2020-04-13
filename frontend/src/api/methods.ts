import Api from "./index";

export default {
  Posting(item: Object) {
    return Api().post("/api", item);
  }
};
