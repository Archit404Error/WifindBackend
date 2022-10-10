"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointCollection = exports.db = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongodb_1 = require("mongodb");
const points_1 = require("./points");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const client = new mongodb_1.MongoClient(process.env.DB_URI);
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});
app.use("/points", points_1.pointRouter);
const server = app.listen(process.env.PORT || 3000, () => {
    console.log("✅: Server is up and running");
    exports.db = client.db("WiFind");
    exports.pointCollection = exports.db.collection("points");
});
