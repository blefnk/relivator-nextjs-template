"use client";

import * as React from "react";

import { useCart } from "~/lib/hooks/use-cart";
import { ProductCard } from "~/ui/components/product-card";
import { Button } from "~/ui/primitives/button";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
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
}

type Category = string;

/* -------------------------------------------------------------------------- */
/*                            Helpers / utilities                             */
/* -------------------------------------------------------------------------- */

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

/* -------------------------------------------------------------------------- */
/*                               Mock data                                    */
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
  },
];

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

export default function ProductsPage() {
  const { addItem } = useCart();

  /* ----------------------- Categories (derived) ------------------------- */
  const categories: Category[] = React.useMemo(() => {
    const dynamic = Array.from(new Set(products.map((p) => p.category))).sort();
    return ["All", ...dynamic];
  }, []);

  /* ----------------------------- State ---------------------------------- */
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category>("All");

  /* --------------------- Filtered products (memo) ----------------------- */
  const filteredProducts = React.useMemo(
    () =>
      selectedCategory === "All"
        ? products
        : products.filter((p) => p.category === selectedCategory),
    [selectedCategory],
  );

  /* --------------------------- Handlers --------------------------------- */
  const handleAddToCart = React.useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        addItem(
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
          },
          1, // (quantity) always adds 1 item to the cart
        );
      }
    },
    [addItem],
  );

  const handleAddToWishlist = React.useCallback((productId: string) => {
    // TODO: integrate with Wishlist feature
    console.log(`Added ${productId} to wishlist`);
  }, []);

  /* ----------------------------- Render --------------------------------- */
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          {/* Heading & filters */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Products</h1>
              <p className="mt-1 text-lg text-muted-foreground">
                Browse our latest products and find something you&apos;ll love.
              </p>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={slugify(category)}
                  variant={
                    category === selectedCategory ? "default" : "outline"
                  }
                  size="sm"
                  className="rounded-full"
                  title={`Filter by ${category}`}
                  aria-pressed={category === selectedCategory}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}

          {/* Pagination (placeholder) */}
          <nav
            className="mt-12 flex items-center justify-center gap-2"
            aria-label="Pagination"
          >
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="default" aria-current="page">
              1
            </Button>
            <Button variant="outline" disabled>
              Next
            </Button>
          </nav>
        </div>
      </main>
    </div>
  );
}
