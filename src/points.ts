import { Router } from "express";
import { ObjectId } from "mongodb";
import { pointCollection } from ".";
export var pointRouter = Router();

pointRouter.get("/:id", async (req, res) =>
  res.json(await pointCollection.findOne({ _id: new ObjectId(req.params.id) }))
);
