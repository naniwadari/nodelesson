import express from "express";
import { Message } from "./entities/Message";
import { getConnectionOptions, createConnection, BaseEntity } from "typeorm";

let app = async () => {
  const app = express();

  //TypeORMの設定
  const connectionOptions = await getConnectionOptions();
  const connection = await createConnection(connectionOptions);
  //ActiveRecordパターンでTypeORMを使用する場合
  BaseEntity.useConnection(connection);

  //corsの許可
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  //body-parserに基づいた着信リクエストの解析
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //GetとPostのルーティング
  app.get("/api", async (req, res) => {
    const msgs = await Message.find();
    res.send(msgs);
  });

  app.post("/api", async (req, res) => {
    const msg = new Message();
    msg.text = req.body.text;
    const newMsg = await Message.save(msg);
    console.log(newMsg);
    res.send(newMsg);
  });

  //3000番ポートでAPIサーバ起動
  app.listen(3000, () => {
    console.log("App litening on port 3000!");
  });
};
app();
