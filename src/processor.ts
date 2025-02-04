import { v4 as uuidv4 } from "uuid";
import { Receipt } from "./types";
import { calculatePoints } from "./calculatePoints";

const receipts: Record<string, Receipt> = {};
const pointsCache: Record<string, number> = {};

export function processReceipt(receipt: Receipt) {
  const id = uuidv4();
  receipts[id] = receipt;
  return id;
}

export function getPoints(id: string) {
  if (!receipts[id]) {
    return;
  }

  if (!pointsCache[id]) {
    pointsCache[id] = calculatePoints(receipts[id]);
  }

  return pointsCache[id];
}
