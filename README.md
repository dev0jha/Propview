# PropView - Property Listing Website

A simple property listing website built with Next.js, featuring SSR for the listing page and SSG for property detail pages.


## Features

- **Listing Page** - Search properties by title, location, or type; paginated results; server-side rendered
- **Detail Page** - Full property details with images, amenities, specs, and agent info; statically generated
- **SEO Optimized** - Dynamic metadata, Open Graph tags, semantic HTML
- **Responsive Design** - Tailwind CSS, mobile-first layout

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Rendering**: SSR (listing) + SSG (details)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Project Structure

```
app/
  layout.tsx          # Root layout with header/footer
  page.tsx            # Listing page (SSR) - search + pagination
  properties/
    [id]/
      page.tsx        # Detail page (SSG) - 24 static pages
components/
  PropertyCard.tsx    # Property card component
  SearchBar.tsx       # Debounced search input
  Pagination.tsx      # Page navigation component
lib/
  types.ts            # TypeScript interfaces
  data.ts             # 24 dummy properties
  useDebouncedCallback.ts
```
