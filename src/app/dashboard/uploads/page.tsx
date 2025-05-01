import UploadsPageClient from "./page.client";

export default function UploadsPage() {
  return (
    <div className="space-y-6 mt-8 mx-4 md:mx-16 lg:mx-32">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Upload New Media</h2>
        <UploadsPageClient />
      </section>
    </div>
  );
}
