import { z } from "zod";

import { HeatLevel } from "@prisma/client";
import { pageSchema } from "./pagination";

export const querySchema = z.preprocess(
  //first : transform raw data
  (value) => (value === "" ? undefined : value),
  //validate
  z.string().trim().min(1).optional(),
);

// function cleanValue(value:unknown) {

//   if(value === "") {
//     return undefined
//   }
//   return value

// }

export const priceSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.coerce.number().positive().optional(),
);

export const heatLevelSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.enum(HeatLevel).optional(),
);

export const sauceFiltersSchema = z.object({
  query: querySchema,
  price: priceSchema,
  heatLevel: heatLevelSchema,
});

export type SauceFilters = z.infer<typeof sauceFiltersSchema>;
