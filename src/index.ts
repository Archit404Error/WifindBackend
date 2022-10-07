import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("✅: Server is up and running");
});
