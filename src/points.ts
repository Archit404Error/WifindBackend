import { Router } from "express";
import { ObjectId } from "mongodb";
import { pointCollection } from ".";
export var pointRouter = Router();

interface point {
  _id: ObjectId;
  speed: number;
  latitude: number;
  longitude: number;
}

pointRouter.get("/:id", async (req, res) =>
  res.json(await pointCollection.findOne({ _id: new ObjectId(req.params.id) }))
);

pointRouter.get("/all", async (req, res) => {
  res.json(await pointCollection.find({}).toArray());
});

pointRouter.post("/", async (req, res) => {
  const point = req.body as point;
  const result = await pointCollection.insertOne(point);
  res.json(result.ops[0]);
});

/**
 * Load a set of predetermined points from DB and also all user collected points
 * Cluster points, find avg speed (cluster labels), classify loaded points
 */
pointRouter.post("/classify", async (req, res) => {});
