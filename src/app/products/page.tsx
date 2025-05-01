"use client";

import * as React from "react";

import { useCart } from "~/lib/hooks/use-cart";
import { ProductCard } from "~/ui/components/product-card";
import { Button } from "~/ui/primitives/button";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type Category = string;

interface Product {
  category: string;
  id: string;
  image: string;
  inStock: boolean;
  name: string;
  originalPrice?: number;
  price: number;
  rating: number;
}

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
    category: "Audio",
    id: "1",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    name: "Premium Wireless Headphones",
    originalPrice: 249.99,
    price: 199.99,
    rating: 4.5,
  },
  {
    category: "Wearables",
    id: "2",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    name: "Smart Watch Series 5",
    originalPrice: 349.99,
    price: 299.99,
    rating: 4.2,
  },
  {
    category: "Photography",
    id: "3",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: false,
    name: "Professional Camera Kit",
    originalPrice: 1499.99,
    price: 1299.99,
    rating: 4.8,
  },
  {
    category: "Furniture",
    id: "4",
    image:
      "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    name: "Ergonomic Office Chair",
    originalPrice: 299.99,
    price: 249.99,
    rating: 4.6,
  },
  {
    category: "Electronics",
    id: "5",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    name: "Smartphone Pro Max",
    originalPrice: 1099.99,
    price: 999.99,
    rating: 4.9,
  },
  {
    category: "Electronics",
    id: "6",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    name: 'Ultra HD Smart TV 55"',
    originalPrice: 899.99,
    price: 799.99,
    rating: 4.7,
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
            category: product.category,
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
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
        <div
          className={`
            container px-4
            md:px-6
          `}
        >
          {/* Heading & filters */}
          <div
            className={`
              mb-8 flex flex-col gap-4
              md:flex-row md:items-center md:justify-between
            `}
          >
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
                  aria-pressed={category === selectedCategory}
                  className="rounded-full"
                  key={slugify(category)}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  title={`Filter by ${category}`}
                  variant={
                    category === selectedCategory ? "default" : "outline"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div
            className={`
              grid grid-cols-1 gap-6
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            `}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                product={product}
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

          {/* Pagination */}
          <nav
            aria-label="Pagination"
            className="mt-12 flex items-center justify-center gap-2"
          >
            <Button disabled variant="outline">
              Previous
            </Button>
            <Button aria-current="page" variant="default">
              1
            </Button>
            <Button disabled variant="outline">
              Next
            </Button>
          </nav>
        </div>
      </main>
    </div>
  );
}
