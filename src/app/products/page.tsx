"use client";

import * as React from "react";

import { useCart } from "~/lib/hooks/use-cart";
import { Header } from "~/ui/components/header";
import { ProductCard } from "~/ui/components/product-card";
import { Button } from "~/ui/primitives/button";

// Mock product data - in a real app, this would come from a database
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

// Mock categories for filtering
const categories = [
  "All",
  "Audio",
  "Wearables",
  "Photography",
  "Furniture",
  "Electronics",
];

export default function ProductsPage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  // Filter products by the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
  };

  const handleAddToWishlist = (productId: string) => {
    console.log(`Added ${productId} to wishlist`);
    // In a real app, this would add the product to the wishlist
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Products</h1>
              <p className="mt-1 text-lg text-muted-foreground">
                Browse our latest products and find something you'll love.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    category === selectedCategory ? "default" : "outline"
                  }
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

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

          {filteredProducts.length === 0 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}

          <div className="mt-12 flex items-center justify-center">
            <Button variant="outline" className="mr-2">
              Previous
            </Button>
            <Button variant="outline" className="mx-1">
              1
            </Button>
            <Button className="mx-1">2</Button>
            <Button variant="outline" className="mx-1">
              3
            </Button>
            <Button variant="outline" className="ml-2">
              Next
            </Button>
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
