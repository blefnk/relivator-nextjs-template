import Header from "~/ui/components/header";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="mb-6 text-5xl font-bold">Relivator Next.js Template</h1>

        <div className="space-y-4 mb-8">
          <p className="text-xl text-gray-600">
            Relivator template is the foundation of your eCommerce platform
          </p>
          <p className="text-xl text-gray-600">
            Build More Efficient, Engaging, and Profitable Online Stores
          </p>
        </div>

        <Header />
      </div>
    </div>
  );
}
