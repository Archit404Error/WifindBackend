import { Router } from "express";
import { ObjectId } from "mongodb";
import { pointCollection } from ".";
import { successJson, errorJson } from "./helpers";

export var pointRouter = Router();

interface point {
  speed: number;
  latitude: number;
  longitude: number;
  date: Date;
}

pointRouter.get("/point/:id", async (req, res) =>
  res.json(
    successJson(
      await pointCollection.findOne({ _id: new ObjectId(req.params.id) })
    )
  )
);

pointRouter.get("/all", async (req, res) => {
  res.json(successJson(await pointCollection.find({}).toArray()));
});

pointRouter.post("/point", (req, res) => {
  req.body.date = new Date(req.body.date);
  const point = req.body as point;
  pointCollection.insertOne(point);
  res.json(successJson("Point added"));
});

/**
 * Locate points close to given point, find avg speed, return value
 */
pointRouter.post("/classify", async (req, res) => {
  const toClassify = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };
  const closePoints = await pointCollection
    .find({
      latitude: {
        $gt: toClassify.latitude - 0.01,
        $lt: toClassify.latitude + 0.01,
      },
      longitude: {
        $gt: toClassify.longitude - 0.01,
        $lt: toClassify.longitude + 0.01,
      },
    })
    .toArray();

  if (closePoints.length === 0) return res.json(errorJson("No points found"));

  let avgSpeed = closePoints.reduce(
    (acc: number, curr: point) => acc + curr.speed,
    0
  );

  res.json(successJson({ speed: avgSpeed / closePoints.length }));
});
