"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "@/lib/useDebouncedCallback";

export function SearchBar({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString()); // update string of url  from that URLSearchParams read,delete,update ,create
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    router.replace(`/?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full max-w-xl">
      <svg
        className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search properties by title, location, or type..."
        className="w-full rounded-xl border border-zinc-200 bg-white py-3 pr-4 pl-10 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-blue-400"
      />
    </div>
  );
}
