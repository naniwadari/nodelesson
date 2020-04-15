"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Message_js_1 = require("./entities/Message.js");
const typeorm_1 = require("typeorm");
let app = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    //TypeORMの設定
    const connectionOptions = yield typeorm_1.getConnectionOptions();
    const connection = yield typeorm_1.createConnection(connectionOptions);
    //ActiveRecordパターンでTypeORMを使用する場合
    typeorm_1.BaseEntity.useConnection(connection);
    //corsの許可
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    //body-parserに基づいた着信リクエストの解析
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    //GetとPostのルーティング
    app.get("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const msg = new Message_js_1.Message();
        msg.text = "HelloWorld";
        yield msg.save;
        const msgs = yield Message_js_1.Message.find();
        res.send(msgs);
    }));
    app.post("/api", (req, res) => {
        res.send({
            message: req.body.text,
        });
    });
    //3000番ポートでAPIサーバ起動
    app.listen(3000, () => {
        console.log("App litening on port 3000!");
    });
});
app();
