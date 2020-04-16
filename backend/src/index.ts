import express from "express";
import { Message } from "./entities/Message";
import { getConnectionOptions, createConnection, BaseEntity } from "typeorm";
import { resolve } from "dns";
import { IMsg } from "./types";

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
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
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
    const result = await Message.save(msg);
    console.log(result);
    res.send(result);
  });

  app.patch("/api/:id", async (req, res) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const msg: Message = req.body;
        const FindRepository = Message.findOne({ id: msg.id });
        if (!FindRepository) {
          reject();
        }
        const result = await Message.save(msg);
        console.log(result);
      } catch (err) {
        reject();
      }
      resolve();
    });
    promise
      .then(() => {
        console.log("update success");
        res.status(200).send("update success");
      })
      .catch(() => {
        console.log("update failed");
        res.status(500).send("update failed");
      });
  });

  app.delete("/api/:id", async (req, res) => {
    const promise = new Promise(async (resolve, reject) => {
      const paramsId = parseInt(req.params.id);
      try {
        const msg = await Message.findOne({ id: paramsId });
        console.log(msg);
        if (!msg) {
          reject();
        }
        //データを削除
        await Message.delete(paramsId);
      } catch (err) {
        reject();
      }
      resolve();
    });
    promise
      .then(() => {
        console.log("delete success");
        res.status(200).send("delete success");
      })
      .catch(() => {
        console.log("delete failed");
        res.status(500).send("delete failed");
      });
  });

  //3000番ポートでAPIサーバ起動
  app.listen(3000, () => {
    console.log("App litening on port 3000!");
  });
};
app();
