"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SaucePaginationProps {
  currentPage: number;
  totalPages: number;
}

export function SaucePagination({
  currentPage,
  totalPages,
}: SaucePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    const newUrl = `${pathname}?${params.toString()}`;

    router.push(newUrl);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-600 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-sm font-medium text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-600 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
