import { DateTime } from "luxon";
import { calculatePoints } from "./calculatePoints";
import BigNumber from "bignumber.js";

describe("get receipt points", () => {
  test("example1", () => {
    const receipt = {
      retailer: "Target",
      purchaseDate: DateTime.fromFormat("2022-01-01", "yyyy-MM-dd"),
      purchaseTime: DateTime.fromFormat("13:01", "HH:mm"),
      items: [
        {
          description: "Mountain Dew 12PK",
          price: new BigNumber("6.49"),
        },
        {
          description: "Emils Cheese Pizza",
          price: new BigNumber("12.25"),
        },
        {
          description: "Knorr Creamy Chicken",
          price: new BigNumber("1.26"),
        },
        {
          description: "Doritos Nacho Cheese",
          price: new BigNumber("3.35"),
        },
        {
          description: "   Klarbrunn 12-PK 12 FL OZ  ",
          price: new BigNumber("12.00"),
        },
      ],
      total: new BigNumber("35.35"),
    };

    const points = calculatePoints(receipt);
    expect(points).toEqual(28);
  });

  test("example2", () => {
    const receipt = {
      retailer: "M&M Corner Market",
      purchaseDate: DateTime.fromFormat("2022-03-20", "yyyy-MM-dd"),
      purchaseTime: DateTime.fromFormat("14:33", "HH:mm"),
      items: [
        {
          description: "Gatorade",
          price: new BigNumber("2.25"),
        },
        {
          description: "Gatorade",
          price: new BigNumber("2.25"),
        },
        {
          description: "Gatorade",
          price: new BigNumber("2.25"),
        },
        {
          description: "Gatorade",
          price: new BigNumber("2.25"),
        },
      ],
      total: new BigNumber("9.00"),
    };

    const points = calculatePoints(receipt);
    expect(points).toEqual(109);
  });

  test("retail name point", () => {
    const receipt = {
      retailer: "Target",
      purchaseDate: DateTime.fromFormat("2022-01-02", "YYYY-MM-DD"),
      purchaseTime: DateTime.fromFormat("13:01", "HH:mm"),
      items: [],
      total: new BigNumber("35.35"),
    };

    const points = calculatePoints(receipt);
    expect(points).toEqual(6);
  });

  test("totalIsRoundDollarPoint", () => {
    const receipt = {
      retailer: "+++",
      purchaseDate: DateTime.fromFormat("2022-01-02", "yyyy-MM-dd"),
      purchaseTime: DateTime.fromFormat("13:01", "HH:mm"),
      items: [],
      total: new BigNumber("30.00"),
    };

    const points = calculatePoints(receipt);
    expect(points).toEqual(75);
  });

  test("purchase day Point", () => {
    const receipt = {
      retailer: "+++",
      purchaseDate: DateTime.fromFormat("2022-01-01", "yyyy-MM-dd"),
      purchaseTime: DateTime.fromFormat("13:01", "HH:mm"),
      items: [],
      total: new BigNumber("1.01"),
    };

    const points = calculatePoints(receipt);
    expect(points).toEqual(6);
  });

  test("purchase time Point", () => {
    const receipt = {
      retailer: "+++",
      purchaseDate: DateTime.fromFormat("2022-01-02", "yyyy-MM-dd"),
      purchaseTime: DateTime.fromFormat("14:01", "HH:mm"),
      items: [],
      total: new BigNumber("1.01"),
    };

    const points = calculatePoints(receipt);
    expect(points).toEqual(10);
  });
});
