"use server";

import { getSession } from "@/lib/auth";
import { Sauce } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { SauceState } from "../types/sauce-state";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { heatLevelSchema } from "../validation/heat-level";

const sauceValidationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  heatLevel: heatLevelSchema,
  originCountry: z.string().min(2, "Origin country is required"),
  image: z.url("Must be a valid image URL").optional().or(z.literal("")),
});

export async function createSauce(
  prevState: SauceState,
  formData: FormData,
): Promise<SauceState> {
  const session = await getSession();

  if (!session) {
    return { error: "You must log in to create a sauce" };
  }

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    heatLevel: formData.get("heatLevel"),
    originCountry: formData.get("originCountry"),
    image: formData.get("image"),
  };
  const result = sauceValidationSchema.safeParse(rawData);

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  await prisma.sauce.create({
    data: {
      ...result.data,
      //placeholder in case there is no image so it never is undefined.
      image: result.data.image || "/placeholder-sauce.png",
      sellerId: session.userId,
    },
  });

  // rerun server components and fetch fresh data from database - cache is stale
  revalidatePath("/sauces");
  redirect("/sauces");
}
