"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";


interface SaucePaginationProps {
  currentPage: number;
  totalPages: number;
}


export function SaucePagination ({currentPage, totalPages,

}: SaucePaginationProps) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

  function goToPage(page: number) {
    const params = new URLSearchParams(
    searchParams.toString(),
  );

  params.set("page", page.toString());

  const newUrl = `${pathname}?${params.toString()}`;

  router.push(newUrl);
}


      return (
    <div>
      <button
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        previous
      </button>

      <span>
        page {currentPage} de {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        next
      </button>
    </div>
  );
}