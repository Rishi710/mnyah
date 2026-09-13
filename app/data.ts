// Placeholder catalogue. Swap names, prices and images for real products.

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  soldOut?: boolean;
  isNew?: boolean;
};

export type Collection = {
  title: string;
  href: string;
  image: string;
};

export type Store = {
  city: string;
  area: string;
  address: string;
  image: string;
  open: boolean;
};

const IMAGES = [
  "/product-01.jpg",
  "/product-02.jpg",
  "/product-03.jpg",
  "/product-04.jpg",
];

function product(
  id: string,
  name: string,
  price: number,
  imageIndex: number,
  extra: Partial<Product> = {},
): Product {
  return { id, name, price, image: IMAGES[imageIndex % IMAGES.length], ...extra };
}

export const LATEST_DROP: Product[] = [
  product("ld-1", "Structured Leather Tote", 4200, 0, { isNew: true }),
  product("ld-2", "Oversized Crew Fleece", 2800, 1, { isNew: true }),
  product("ld-3", "Ribbed Wool Beanie", 980, 2),
  product("ld-4", "Canvas Low Sneaker", 5500, 3, { isNew: true }),
  product("ld-5", "Everyday Shopper Tote", 3600, 0),
  product("ld-6", "Heavyweight Crew", 2600, 1),
];

export const BAGS: Product[] = [
  product("bg-1", "Structured Leather Tote — Black", 4200, 0),
  product("bg-2", "Structured Leather Tote — Large", 5200, 0),
  product("bg-3", "Everyday Shopper Tote", 3600, 0, { soldOut: true }),
  product("bg-4", "Mini Leather Tote", 2900, 0),
  product("bg-5", "Weekend Carryall", 6800, 0),
];

export const ESSENTIALS: Product[] = [
  product("es-1", "Oversized Crew Fleece — Off White", 2800, 1),
  product("es-2", "Ribbed Wool Beanie — Black", 980, 2),
  product("es-3", "Canvas Low Sneaker — White", 5500, 3),
  product("es-4", "Structured Leather Tote", 4200, 0),
  product("es-5", "Heavyweight Crew — Ecru", 2600, 1, { soldOut: true }),
  product("es-6", "Ribbed Wool Beanie — Grey", 980, 2),
  product("es-7", "Canvas Low Sneaker — Black", 5500, 3),
  product("es-8", "Oversized Crew Fleece — Black", 2800, 1),
];

export const COLLECTIONS: Collection[] = [
  { title: "New Season", href: "#latest-drop", image: "/mnyah-hero.jpg" },
  { title: "Bags", href: "#bags", image: "/product-01.jpg" },
  { title: "Fleece & Knits", href: "#essentials", image: "/product-02.jpg" },
  { title: "Headwear", href: "#essentials", image: "/product-03.jpg" },
  { title: "Footwear", href: "#essentials", image: "/product-04.jpg" },
];

export const STORES: Store[] = [
  {
    city: "Mumbai",
    area: "Flagship",
    address: "Store address — add your flagship location here.",
    image: "/product-01.jpg",
    open: true,
  },
  {
    city: "Delhi",
    area: "Studio",
    address: "Store address — add your studio location here.",
    image: "/product-02.jpg",
    open: true,
  },
  {
    city: "Bengaluru",
    area: "Studio",
    address: "Opening soon.",
    image: "/product-04.jpg",
    open: false,
  },
];

export const NAV = {
  Collections: ["New Season", "Essentials", "Bags", "Footwear"],
  Top: ["T-Shirts", "Shirts", "Sweatshirts", "Fleece", "Jackets"],
  Bottom: ["Trousers", "Denim", "Shorts"],
  Accessories: ["Bags", "Beanies", "Caps", "Footwear"],
};

export function formatPrice(value: number) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}
