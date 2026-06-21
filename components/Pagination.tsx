import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

export function Pagination({
  currentPage,
  totalPages,
  searchQuery,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function getHref(page: number) {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return `/?${qs}`;
  }

  const pages: (number | "...")[] = [];
  const delta = 1;
  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);
  if (rangeStart > 2) pages.push("...");
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
  if (rangeEnd < totalPages - 1) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);

  return (
    <nav className="flex items-center justify-center gap-1">
      <Link
        href={getHref(currentPage - 1)}
        className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors ${
          currentPage <= 1
            ? "pointer-events-none text-zinc-300 dark:text-zinc-600"
            : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        }`}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : 0}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </Link>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-10 w-10 items-center justify-center text-sm text-zinc-400"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={getHref(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {page}
          </Link>
        )
      )}

      <Link
        href={getHref(currentPage + 1)}
        className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors ${
          currentPage >= totalPages
            ? "pointer-events-none text-zinc-300 dark:text-zinc-600"
            : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        }`}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : 0}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </Link>
    </nav>
  );
}
