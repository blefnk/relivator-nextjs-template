"use client";

import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";

import { useCart } from "~/lib/hooks/use-cart";
import { Header } from "~/ui/components/header";
import { Button } from "~/ui/primitives/button";
import { Separator } from "~/ui/primitives/separator";

// Import product data (same as in products/page.tsx)
// In a real app this would come from a database
const products = [
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

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  // Find the product by ID
  const product = products.find((p) => p.id === id);

  // If product not found, show error
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-10">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold">Product Not Found</h1>
            <p className="mt-4">
              The product you're looking for doesn't exist.
            </p>
            <Button className="mt-6" onClick={() => router.push("/products")}>
              Back to Products
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add the product to cart with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }

    // Reset quantity after adding to cart
    setQuantity(1);
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.push("/products")}
          >
            ← Back to Products
          </Button>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Product Image */}
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

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={`star-${product.id}-position-${i + 1}`}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating || 0)
                            ? "fill-primary text-primary"
                            : i < (product.rating || 0)
                              ? "fill-primary/50 text-primary"
                              : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.rating})
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-lg font-medium text-muted-foreground">
                  {product.category}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-3xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice ? (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  ) : null}
                </div>
              </div>

              <p className="mb-6 text-muted-foreground">
                {product.description}
              </p>

              {product.inStock ? (
                <div className="mb-6">
                  <p className="text-sm font-medium text-green-600">In Stock</p>
                </div>
              ) : (
                <div className="mb-6">
                  <p className="text-sm font-medium text-red-500">
                    Out of Stock
                  </p>
                </div>
              )}

              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Product Features */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={`feature-${product.id}-${feature.replace(/\s+/g, "-").toLowerCase()}`}
                    className="flex items-start"
                  >
                    <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Specifications */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Specifications</h2>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Relivator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
