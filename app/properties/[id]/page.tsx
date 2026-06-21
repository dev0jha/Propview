import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperties, getPropertyById } from "@/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getProperties().map((property) => ({ id: property.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) return {};

  return {
    title: property.title,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: [{ url: property.image }],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
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
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to listings
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-xl aspect-4/3">
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {property.images.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {property.images.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg h-24">
                    <Image
                      src={img}
                      alt={`${property.title} - image ${i + 1}`}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {property.type}
              </span>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {property.title}
              </h1>
            </div>
            <p className="shrink-0 text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formattedPrice}
            </p>
          </div>

          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {property.location}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="text-center">
              <p className="text-lg font-bold">{property.bedrooms}</p>
              <p className="text-xs text-zinc-500">Bedrooms</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{property.bathrooms}</p>
              <p className="text-xs text-zinc-500">Bathrooms</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{property.area}</p>
              <p className="text-xs text-zinc-500">Sq. Ft.</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold">Description</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {property.description}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold">Year Built</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {property.yearBuilt}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold">Amenities</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <h2 className="font-semibold">Contact Agent</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {property.agentName}
            </p>
            <p className="text-sm text-zinc-500">{property.agentPhone}</p>
            <p className="text-sm text-zinc-500">{property.agentEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
