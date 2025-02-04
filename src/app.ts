import express from "express";
import { middleware } from "express-openapi-validator";
import { zodReceipt } from "./types";
import { getPoints, processReceipt } from "./processor";

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  middleware({
    apiSpec: "./api.yaml",
    validateRequests: true,
    validateResponses: true,
  })
);

app.post("/receipts/process", (req, res) => {
  const parseResult = zodReceipt.safeParse(req.body);
  if (!parseResult.success) {
    console.error(parseResult.error);
    res.status(400).send("The receipt is invalid.");
    return;
  }
  const id = processReceipt(parseResult.data);
  res.status(200).send({ id });
});

app.get("/receipts/:id/points", (req, res) => {
  const { id } = req.params;
  const points = getPoints(id);
  if (!points) {
    res.status(404).send("No receipt found for that ID.");
    return;
  }

  res.status(200).send({
    points,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
