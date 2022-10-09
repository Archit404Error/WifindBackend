import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { pointRouter } from "./points";

const app = express();
app.use(cors());
const client = new MongoClient(process.env.DB_URI as any);
export var db: any, pointCollection: any;

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/points", pointRouter);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("✅: Server is up and running");
  db = client.db("WiFind");
  pointCollection = db.collection("points");
});
