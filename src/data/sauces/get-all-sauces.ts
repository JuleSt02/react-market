import { Sauce } from "@prisma/client"
import { prisma} from "@/lib/prisma";
import { SauceFilters } from "@/app/schemas/sauce-filters-schema";
import { Prisma } from "@prisma/client";
import { PaginationParams } from "@/app/schemas/pagination";


export const getAllSauces = async (
  filters: SauceFilters, pagination: PaginationParams
): Promise<{sauces: Sauce[]; totalCount: number}> => {
  const { query, price, heatLevel } = filters;
  
  const {page, pageSize} = pagination

  const skip = (page - 1) * pageSize;


  const where: Prisma.SauceWhereInput = {};

  if (query !== undefined) {
    where.OR = [
      {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: query,
          mode: "insensitive",
        },
      },
    ];
  }

  if (price !== undefined) {
    where.price = {
      lte: price,
    };
  }

  if (heatLevel !== undefined) {
    where.heatLevel = heatLevel;
  }

  const [sauces, totalCount] = await Promise.all([
    prisma.sauce.findMany({ where, skip, take: pageSize }),
    prisma.sauce.count({ where }),
  ]);

  return {sauces,totalCount};
};