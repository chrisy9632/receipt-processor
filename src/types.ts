import { BigNumber } from "bignumber.js";
import { DateTime } from "luxon";
import { z } from "zod";

export const zodReceipt = z.object({
  retailer: z.string(),
  purchaseDate: z
    .string()
    .transform((date) => DateTime.fromFormat(date, "yyyy-MM-dd")),
  purchaseTime: z
    .string()
    .transform((time) => DateTime.fromFormat(time, "HH:mm")),
  items: z.array(
    z
      .object({
        shortDescription: z.string(),
        price: z.string().transform((price) => new BigNumber(price)),
      })
      .transform(({ shortDescription, price }) => ({
        description: shortDescription,
        price,
      }))
  ),
  total: z.string().transform((total) => new BigNumber(total)),
});

export type Receipt = z.infer<typeof zodReceipt>;
