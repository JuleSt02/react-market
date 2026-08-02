import { prisma } from "@/lib/prisma";

import { Sauce } from "@prisma/client";

export const getSauceById = async (id: number): Promise<Sauce | null> => {
  const sauce = await prisma.sauce.findUnique({
    where: {
      id,
    },
  });

  return sauce;
};
