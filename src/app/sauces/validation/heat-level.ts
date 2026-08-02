import { z } from "zod";

export const heatLevelSchema = z.enum([
  "MILD",
  "WARM",
  "SPICY",
  "HOT",
  "FIERY",
  "EXTREME",
  "REAPER",
]);

export type HeatLevel = z.infer<typeof heatLevelSchema>;
