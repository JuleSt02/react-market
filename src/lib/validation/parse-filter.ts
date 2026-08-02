import { z } from "zod";

//check raw value against schema valid : data, invalid: undefined
export function parseFilter<T>(
  schema: z.ZodType<T>,
  value: unknown,
): T | undefined {
  const result = schema.safeParse(value);

  if (result.success) {
    return result.data;
  }

  return undefined;
}
