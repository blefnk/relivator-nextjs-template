"use client";

import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";

import { useCart } from "~/lib/hooks/use-cart";
import { Button } from "~/ui/primitives/button";
import { Separator } from "~/ui/primitives/separator";

/* -------------------------------------------------------------------------- */
/*                               Type declarations                            */
/* -------------------------------------------------------------------------- */

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  description: string;
  features: string[];
  specs: Record<string, string>;
}

/* -------------------------------------------------------------------------- */
/*                         Helpers (shared, memo-safe)                        */
/* -------------------------------------------------------------------------- */

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** `feature -> feature` ➜ `feature-feature` (for React keys) */
const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

/** Build an integer array `[0,…,length-1]` once */
const range = (length: number) => Array.from({ length }, (_, i) => i);

/* -------------------------------------------------------------------------- */
/*                        Static product data (demo only)                     */
/* -------------------------------------------------------------------------- */

const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Audio",
    rating: 4.5,
    inStock: true,
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design for all-day listening comfort.",
    features: [
      "Active noise cancellation",
      "30-hour battery life",
      "Bluetooth 5.2 connectivity",
      "Comfortable memory foam ear cushions",
      "Quick charge - 5 minutes for 4 hours of playback",
      "Built-in microphone for calls",
    ],
    specs: {
      brand: "AudioMax",
      model: "WH-1000XM5",
      connectivity: "Bluetooth 5.2, 3.5mm jack",
      batteryLife: "30 hours",
      weight: "250g",
      warranty: "2 years",
    },
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 299.99,
    originalPrice: 349.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Wearables",
    rating: 4.2,
    inStock: true,
    description:
      "Stay connected and track your fitness goals with our advanced smartwatch. Features health monitoring, GPS tracking, and a beautiful always-on display.",
    features: [
      "Health monitoring (heart rate, ECG, sleep)",
      "Water resistant up to 50m",
      "GPS tracking",
      "7-day battery life",
      "Always-on retina display",
      "Customizable watch faces",
    ],
    specs: {
      brand: "TechFit",
      model: "Watch Pro 5",
      display: '1.5" AMOLED',
      waterResistance: "5 ATM",
      batteryLife: "7 days",
      compatibility: "iOS, Android",
      warranty: "1 year",
    },
  },
  {
    id: "3",
    name: "Professional Camera Kit",
    price: 1299.99,
    originalPrice: 1499.99,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Photography",
    rating: 4.8,
    inStock: false,
    description:
      "Capture stunning photos and videos with our professional camera kit. Includes a high-resolution sensor, 4K video recording, and a versatile lens kit for any shooting situation.",
    features: [
      "24.2MP full-frame sensor",
      "4K video recording at 60fps",
      "5-axis image stabilization",
      "Weather-sealed body",
      "Dual SD card slots",
      "Includes 24-70mm f/2.8 lens",
    ],
    specs: {
      brand: "OptiPro",
      model: "X-1000",
      sensorType: "Full-frame CMOS",
      resolution: "24.2MP",
      iso: "100-51,200 (expandable to 204,800)",
      shutter: "1/8000 to 30 sec",
      warranty: "2 years",
    },
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    price: 249.99,
    originalPrice: 299.99,
    image:
      "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Furniture",
    rating: 4.6,
    inStock: true,
    description:
      "Work in comfort with our ergonomic office chair designed for all-day support. Features adjustable height, lumbar support, and breathable mesh back.",
    features: [
      "Adjustable height and armrests",
      "Breathable mesh back",
      "Lumbar support",
      "360° swivel",
      "Heavy-duty base with smooth-rolling casters",
      "Weight capacity: 300 lbs",
    ],
    specs: {
      brand: "ErgoComfort",
      model: "Executive Pro",
      material: "Mesh back, fabric seat",
      adjustableHeight: "16-20 inches",
      maxWeight: "300 lbs",
      dimensions: '26"W x 26"D x 38-42"H',
      warranty: "5 years",
    },
  },
  {
    id: "5",
    name: "Smartphone Pro Max",
    price: 999.99,
    originalPrice: 1099.99,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Electronics",
    rating: 4.9,
    inStock: true,
    description:
      "The ultimate smartphone experience with a stunning display, powerful camera system, and all-day battery life.",
    features: [
      '6.7" Super Retina XDR display',
      "Triple camera system (12MP wide, ultra-wide, telephoto)",
      "Face ID for secure authentication",
      "A16 Bionic chip",
      "Up to 1TB storage",
      "All-day battery life",
    ],
    specs: {
      brand: "TechPro",
      model: "Galaxy Pro Max",
      display: '6.7" Super Retina XDR',
      processor: "A16 Bionic chip",
      storage: "128GB/256GB/512GB/1TB",
      camera: "12MP triple camera system",
      battery: "4,352mAh",
      os: "iOS 16",
      warranty: "1 year",
    },
  },
  {
    id: "6",
    name: 'Ultra HD Smart TV 55"',
    price: 799.99,
    originalPrice: 899.99,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Electronics",
    rating: 4.7,
    inStock: true,
    description:
      "Transform your home entertainment with our Ultra HD Smart TV featuring vibrant colors, immersive sound, and smart connectivity.",
    features: [
      '55" 4K Ultra HD display',
      "Dolby Vision HDR",
      "Dolby Atmos sound",
      "Built-in voice assistant",
      "Smart home integration",
      "Multiple HDMI and USB ports",
    ],
    specs: {
      brand: "VisionPro",
      model: "X55-4K",
      display: '55" 4K Ultra HD LED',
      resolution: "3840 x 2160",
      refreshRate: "120Hz",
      hdr: "Dolby Vision, HDR10+",
      connectivity: "HDMI x4, USB x3, Wi-Fi, Bluetooth",
      audio: "40W Dolby Atmos",
      smartFeatures: "Voice control, App store",
      warranty: "2 years",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export default function ProductDetailPage() {
  /* ----------------------------- Routing --------------------------------- */
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  /* ----------------------------- Cart hook ------------------------------- */
  const { addItem } = useCart();

  /* ----------------------------- Local state ----------------------------- */
  const [quantity, setQuantity] = React.useState(1);
  const [isAdding, setIsAdding] = React.useState(false);

  /* ------------------------ Derive product object ------------------------ */
  const product = React.useMemo(() => products.find((p) => p.id === id), [id]);

  /* ----------------------- Derived/computed values ----------------------- */
  const discountPercentage = React.useMemo(() => {
    if (!product?.originalPrice) return 0;
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    );
  }, [product]);

  /* ------------------------------ Handlers ------------------------------- */
  const handleQuantityChange = React.useCallback((newQty: number) => {
    setQuantity((prev) => (newQty >= 1 ? newQty : prev));
  }, []);

  const handleAddToCart = React.useCallback(async () => {
    if (!product) return;

    setIsAdding(true);
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
      quantity,
    );
    setQuantity(1);
    // toast.success(`${product.name} added to cart`);
    await new Promise((r) => setTimeout(r, 400)); // fake latency
    setIsAdding(false);
  }, [addItem, product, quantity]);

  /* -------------------------- Conditional UI ---------------------------- */
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 py-10">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold">Product Not Found</h1>
            <p className="mt-4">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button className="mt-6" onClick={() => router.push("/products")}>
              Back to Products
            </Button>
          </div>
        </main>
      </div>
    );
  }

  /* ------------------------------ Markup --------------------------------- */
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          {/* Back link */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.push("/products")}
            aria-label="Back to products"
          >
            ← Back to Products
          </Button>

          {/* Main grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* ------------------------ Product image ------------------------ */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {discountPercentage > 0 && (
                <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  -{discountPercentage}%
                </div>
              )}
            </div>

            {/* ---------------------- Product info -------------------------- */}
            <div className="flex flex-col">
              {/* Title & rating */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold">{product.name}</h1>

                <div className="mt-2 flex items-center gap-2">
                  {/* Stars */}
                  <div
                    className="flex items-center"
                    aria-label={`Rating ${product.rating} out of 5`}
                  >
                    {range(5).map((i) => (
                      <Star
                        key={`star-${i}`}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : i < product.rating
                              ? "fill-primary/50 text-primary"
                              : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.rating.toFixed(1)})
                  </span>
                </div>
              </div>

              {/* Category & prices */}
              <div className="mb-6">
                <p className="text-lg font-medium text-muted-foreground">
                  {product.category}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-3xl font-bold">
                    {CURRENCY_FORMATTER.format(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {CURRENCY_FORMATTER.format(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 text-muted-foreground">
                {product.description}
              </p>

              {/* Stock */}
              <div className="mb-6" aria-live="polite" aria-atomic="true">
                {product.inStock ? (
                  <p className="text-sm font-medium text-green-600">In Stock</p>
                ) : (
                  <p className="text-sm font-medium text-red-500">
                    Out of Stock
                  </p>
                )}
              </div>

              {/* Quantity selector & Add to cart */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Quantity */}
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-12 text-center select-none">
                    {quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Add to cart */}
                <Button
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {isAdding ? "Adding…" : "Add to Cart"}
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* ---------------------- Features & Specs ------------------------ */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Features */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={`feature-${product.id}-${slugify(feature)}`}
                    className="flex items-start"
                  >
                    <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">Specifications</h2>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b pb-2 text-sm"
                  >
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
