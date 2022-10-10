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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointRouter = void 0;
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const _1 = require(".");
const helpers_1 = require("./helpers");
exports.pointRouter = (0, express_1.Router)();
exports.pointRouter.get("/point/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json((0, helpers_1.successJson)(yield _1.pointCollection.findOne({ _id: new mongodb_1.ObjectId(req.params.id) })));
}));
exports.pointRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json((0, helpers_1.successJson)(yield _1.pointCollection.find({}).toArray()));
}));
exports.pointRouter.post("/point", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.date = new Date(req.body.date);
    const point = req.body;
    const result = yield _1.pointCollection.insertOne(point);
    res.json((0, helpers_1.successJson)(result.ops[0]));
}));
/**
 * Locate points close to given point, find avg speed, return value
 */
exports.pointRouter.post("/classify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toClassify = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    };
    const closePoints = yield _1.pointCollection
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
    if (closePoints.length === 0)
        return res.json((0, helpers_1.errorJson)("No points found"));
    let avgSpeed = closePoints.reduce((acc, curr) => acc + curr.speed, 0);
    res.json((0, helpers_1.successJson)({ speed: avgSpeed / closePoints.length }));
}));
