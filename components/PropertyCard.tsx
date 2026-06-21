import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";

export function PropertyCard({ property }: { property: Property }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-100">
          {property.type}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-zinc-900 truncate dark:text-zinc-100">
          {property.title}
        </h3>
        <p className="mt-1 text-sm text-zinc-500 truncate dark:text-zinc-400">
          {property.location}
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <span className="flex items-center gap-1">
            <BedIcon />
            {property.bedrooms} bed
          </span>
          <span className="flex items-center gap-1">
            <BathIcon />
            {property.bathrooms} bath
          </span>
          <span className="flex items-center gap-1">
            <AreaIcon />
            {property.area} sqft
          </span>
        </div>
        <p className="mt-3 text-lg font-bold text-blue-600 dark:text-blue-400">
          {formattedPrice}
        </p>
      </div>
    </Link>
  );
}

function BedIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
      />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>
  );
}
