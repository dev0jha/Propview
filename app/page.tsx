import type { Metadata } from "next";
import { searchProperties } from "@/lib/data";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { Pagination } from "@/components/Pagination";

export const metadata: Metadata = {
  title: "Browse Properties",
  description:
    "Search and browse through our extensive collection of available properties.",
};

const PER_PAGE = 8;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q, page } = await searchParams;
  const query = typeof q === "string" ? q : "";
  const currentPage = Math.max(1, Number(typeof page === "string" ? page : 1));

  const allProperties = searchProperties(query);
  const totalPages = Math.max(1, Math.ceil(allProperties.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProperties = allProperties.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Find Your Dream Property
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Browse through our curated selection of available properties.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <SearchBar defaultValue={query} />
      </div>

      {query && (
        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          {allProperties.length} result{allProperties.length !== 1 ? "s" : ""}{" "}
          for &ldquo;{query}&rdquo;
        </p>
      )}

      {paginatedProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            No properties found
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Try adjusting your search terms.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-10">
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              searchQuery={query}
            />
          </div>
        </>
      )}
    </div>
  );
}
