import { ArrowRight, Clock, ShoppingBag, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import United24Banner from "~/ui/components/banners/u24";
import { ProductCard } from "~/ui/components/product-card";
import { TestimonialsSection } from "~/ui/components/testimonials/testimonials-with-marquee";
import { Button } from "~/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/ui/primitives/card";
import { categories, featuredProducts, testimonials } from "./mocks";

// Mock data for the Why Choose Us section
const features = [
  {
    title: "Free Shipping",
    description:
      "Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.",
    icon: <Truck className="h-6 w-6 text-primary" />,
  },
  {
    title: "Secure Checkout",
    description:
      "Your payment information is always safe and secure with us. We use industry-leading encryption.",
    icon: <ShoppingBag className="h-6 w-6 text-primary" />,
  },
  {
    title: "24/7 Support",
    description:
      "Our customer support team is always available to help with any questions or concerns.",
    icon: <Clock className="h-6 w-6 text-primary" />,
  },
  {
    title: "Quality Guarantee",
    description:
      "We stand behind the quality of every product we sell. 30-day money-back guarantee.",
    icon: <Star className="h-6 w-6 text-primary" />,
  },
];

export default function HomePage() {
  return (
    <>
      <United24Banner animateGradient={false} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 via-muted/25 to-background py-24 md:py-32">
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[length:20px_20px]" />
          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    New Collection Available
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
                    Your One-Stop Shop for{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      Everything Tech
                    </span>
                  </h1>
                  <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                    Discover premium products at competitive prices, with fast
                    shipping and exceptional customer service.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/products">
                    <Button size="lg" className="h-12 gap-1.5 px-8">
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/showcase">
                    <Button variant="outline" size="lg" className="h-12 px-8">
                      View Showcase
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Truck className="h-5 w-5 text-primary/70" />
                    <span>Free shipping over $50</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-5 w-5 text-primary/70" />
                    <span>24/7 Customer Support</span>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto hidden aspect-square w-full max-w-md overflow-hidden rounded-xl border lg:block">
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
                <Image
                  src="https://images.unsplash.com/photo-1624767735494-1929dc24ad43?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  alt="Shopping experience"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </section>

        {/* Featured Categories */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Shop by Category
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 max-w-2xl text-center text-muted-foreground">
                Find the perfect device for your needs from our curated
                collections
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/products?category=${category.name.toLowerCase()}`}
                  className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-md"
                  aria-label={`Browse ${category.name} products`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent" />
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative z-20 -mt-6 p-4">
                    <div className="mb-1 text-lg font-medium">
                      {category.name}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {category.productCount} products
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Featured Products
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 max-w-2xl text-center text-muted-foreground">
                Check out our latest and most popular tech items
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Link href="/products">
                <Button variant="outline" size="lg" className="group h-12 px-8">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Why Choose Us
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 max-w-2xl text-center text-muted-foreground md:text-lg">
                We offer the best shopping experience with premium features
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-none bg-background shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <CardHeader className="pb-2">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TestimonialsSection
              title="What Our Customers Say"
              description="Don't just take our word for it - hear from our satisfied customers"
              testimonials={testimonials}
              className="py-0"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-xl bg-primary/10 p-8 md:p-12">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]" />
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Ready to Upgrade Your Tech?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                  Join thousands of satisfied customers and experience the best
                  tech products on the market. Sign up today for exclusive deals
                  and offers.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href="/auth/sign-up">
                    <Button size="lg" className="h-12 px-8">
                      Sign Up Now
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="outline" size="lg" className="h-12 px-8">
                      Browse Products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
