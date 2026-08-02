"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SauceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateSauceFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    //reset pagination whenever a filter changes
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <input
        defaultValue={searchParams.get("query") ?? ""}
        onChange={(event) => updateSauceFilter("query", event.target.value)}
        placeholder="Search sauces..."
        className="w-64 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
      />

      <select
        defaultValue={searchParams.get("price") ?? ""}
        onChange={(event) => updateSauceFilter("price", event.target.value)}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm outline-none"
      >
        <option value="">All prices</option>
        <option value="5">Up to 5€</option>
        <option value="10">Up to 10€</option>
      </select>

      <select
        defaultValue={searchParams.get("heatLevel") ?? ""}
        onChange={(event) => updateSauceFilter("heatLevel", event.target.value)}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
      >
        <option value="">All heat levels</option>
        <option value="MILD">MILD</option>
        <option value="WARM">WARM</option>
        <option value="SPICY">SPICY</option>
        <option value="HOT">HOT</option>
        <option value="FIERY">FIERY</option>
        <option value="EXTREME">EXTREME</option>
        <option value="REAPER">REAPER</option>
      </select>
    </div>
  );
}
