import Api from "./index";
export default {
    testPosting: function (item) {
        return Api().post("/api", item);
    }
};
//# sourceMappingURL=methods.js.map