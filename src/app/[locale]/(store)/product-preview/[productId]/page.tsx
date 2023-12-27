import { redirect } from "next/navigation";

interface ProductPreviewPageProperties {
  params: {
    productId: string;
  };
}

export default function ProductPreviewPage({
  params,
}: ProductPreviewPageProperties) {
  const productId = Number(params.productId);

  redirect(`/product/${productId}`);
}
