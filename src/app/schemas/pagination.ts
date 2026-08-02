import { z } from "zod";

export const pageSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.coerce.number().int().positive().optional(),
);

export type PaginationParams = {
  page: number;
  pageSize: number;
};
