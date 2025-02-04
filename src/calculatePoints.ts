import { BigNumber } from "bignumber.js";
import { Receipt } from "./types";

type RewardRuleFunc = (receipt: Receipt) => number;

const rewardRules: RewardRuleFunc[] = [
  retailerNamePoint,
  totalIsRoundDollarPoint,
  quarterMultiplePoint,
  twoItemsPoint,
  itemDescriptionPoint,
  dayPoint,
  timePoint,
];

export function calculatePoints(receipt: Receipt) {
  return BigNumber.sum(...rewardRules.map((func) => func(receipt))).toNumber();
}

function retailerNamePoint({ retailer }: Receipt) {
  let count = 0;
  for (let i = 0; i < retailer.length; i++) {
    const code = retailer.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      continue;
    }
    count++;
  }

  return count;
}

function totalIsRoundDollarPoint({ total }: Receipt) {
  return total.gt(0) && total.mod(1).isZero() ? 50 : 0;
}

function quarterMultiplePoint({ total }: Receipt) {
  return total.gt(0) && total.mod(0.25).isZero() ? 25 : 0;
}

function twoItemsPoint({ items }: Receipt) {
  return Math.floor(items.length / 2) * 5;
}

function itemDescriptionPoint({ items }: Receipt) {
  return BigNumber.sum(
    0,
    ...items.map(({ description, price }) => {
      if (description.trim().length % 3 == 0) {
        return Math.ceil(price.multipliedBy(0.2).toNumber());
      }
      return 0;
    })
  ).toNumber();
}

function dayPoint({ purchaseDate }: Receipt) {
  return purchaseDate.day % 2 == 1 ? 6 : 0;
}

function timePoint({ purchaseTime }: Receipt) {
  return (purchaseTime.hour == 14 && purchaseTime.minute > 0) ||
    purchaseTime.hour == 15
    ? 10
    : 0;
}
