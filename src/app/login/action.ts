"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import bcrypt from "bcrypt";

export type LoginState = {
  error?: string;
};

export async function login(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  //formData > browsers native way of representing submitted
  //form fields that are passed automatically through form action={login}
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { error: "Invalid email or password" };
  }

  const validPwd = await bcrypt.compare(password, user.password);

  if (!validPwd) {
    return { error: "Invalid email or password" };
  }

  //if propper credentials, create a signed, cookie-based session
  // to identify the user in future requests

  await createSession(user.id);

  redirect("/");
}
