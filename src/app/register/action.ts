"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export type RegisterState = {
  error?: string;
};

export async function register(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || password.length < 8) {
    return {
      error: "Email and a password of at least 8 characters are required",
    };
  }

  const existingUser = prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  redirect("/login");
}
