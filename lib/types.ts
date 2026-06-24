export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images: string[];
  type: "house" | "apartment" | "condo" | "villa";
  yearBuilt: number;
  amenities: string[];
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  latitude: number;
  longitude: number;
}

export interface PaginationData {
  total: number;
  page: number;
  totalPages: number;
  perPage: number;
}
