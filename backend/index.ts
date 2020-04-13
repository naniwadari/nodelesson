import express from "express";

const app: express.Express = express();

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
const router: express.Router = express.Router();
router.get("/api", (req: express.Request, res: express.Response) => {
  res.send(req.query);
});
router.post("/api", (req: express.Request, res: express.Response) => {
  res.send({
    message: req.body.text,
  });
});
app.use(router);

//3000番ポートでAPIサーバ起動
app.listen(3000, () => {
  console.log("App litening on port 3000!");
});
