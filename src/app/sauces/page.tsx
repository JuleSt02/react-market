import Link from "next/link";
import SauceCard from "../components/sauces/SauceCard";
import { Sauce } from "@prisma/client";
import { getAllSauces } from "@/data/sauces/get-all-sauces";
import { HeatLevel } from "@prisma/client";
import {
  querySchema,
  priceSchema,
  heatLevelSchema,
  type SauceFilters,
} from "../schemas/sauce-filters-schema";
import { pageSchema } from "../schemas/pagination";
import { parseFilter } from "@/lib/validation/parse-filter";
import SauceFilter from "../components/SauceFilter";
import { PaginationParams } from "../schemas/pagination";
import { PAGE_SIZE } from "@/lib/pagination";
import { SaucePagination } from "../components/sauces/SaucePagination";

//transport layer coming from Next.js
interface SaucesPageProps {
  searchParams: Promise<{
    query?: string;
    price?: string;
    heatLevel?: string;
    page?: string;
  }>;
}

export default async function SaucesPage(props: SaucesPageProps) {
  const rawFilters = await props.searchParams;

  const filters: SauceFilters = {
    query: parseFilter(querySchema, rawFilters.query),
    price: parseFilter(priceSchema, rawFilters.price),
    heatLevel: parseFilter(heatLevelSchema, rawFilters.heatLevel),
  };

  const parsedPage = parseFilter(pageSchema, rawFilters.page);

  const currentPage = parsedPage !== undefined ? parsedPage : 1;

  const pagination: PaginationParams = {
    page: currentPage,
    pageSize: PAGE_SIZE,
  };

  const { sauces, totalCount } = await getAllSauces(filters, pagination);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex justify-center">
        <SauceFilter />
      </div>

      <section className="flex flex-wrap justify-center gap-6">
        {sauces.map((sauce) => (
          <SauceCard key={sauce.id} sauce={sauce} />
        ))}
      </section>

      <div className="mt-10">
        <SaucePagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
