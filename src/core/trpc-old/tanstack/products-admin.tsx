"use client";

import { Button } from "@/components/ui/button";
import { useQueryNormalizer } from "@normy/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

// @see https://github.com/klis87/normy#readme */
const sleep = () => new Promise((resolve) => setTimeout(resolve, 10));

const TanstackProducts = () => {
  const { data: productsData = [] } = useQuery({
    queryFn: () =>
      Promise.resolve([
        {
          id: "0",
          name: "Product 0",
          seller: null,
        },
        {
          id: "1",
          name: "Product 1",
          seller: {
            id: "1000",
            name: "Store 1",
          },
        },
        {
          id: "2",
          name: "Product 2",
          seller: {
            id: "1001",
            name: "Store 2",
          },
        },
      ]),
    queryKey: ["products"],
  });

  return (
    <div className="space-y-2">
      {productsData.map((product) => (
        <div
          className={`
            rounded bg-zinc-200 p-4 shadow

            dark:bg-zinc-900
          `}
          key={product.id}
        >
          <span className="font-semibold">{product.name}</span>
          {}
          {product.seller && (
            <>
              - <span className="opacity-70">{product.seller.name}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default function ProductsAdminManagement() {
  const t = useTranslations();

  const queryClient = useQueryClient();
  const queryNormalizer = useQueryNormalizer();

  const { data: productData } = useQuery({
    queryFn: () =>
      Promise.resolve({
        id: "1",
        name: "Product 1",
        seller: {
          id: "1000",
          name: "Store 1",
        },
      }),
    queryKey: ["product"],
    select: (data) => ({
      ...data,
      name: undefined,
      nameLong: data.name,
    }),
  });

  const updateProductNameMutation = useMutation({
    mutationFn: async () => {
      await sleep();

      return {
        id: "1",
        name: "Product 1 (Updated)",
      };
    },
  });

  const updateProductSellerMutation = useMutation({
    mutationFn: async () => {
      await sleep();

      return {
        id: "0",
        seller: {
          id: "1004",
          name: "Store 4 (new)",
        },
      };
    },
  });

  const addProductMutation = useMutation({
    mutationFn: async () => {
      await sleep();

      return {
        id: "3",
        name: "Product 3",
        seller: {
          id: "1002",
          name: "Store 3",
        },
      };
    },
    onSuccess: () => {
      queryClient.setQueryData(["products"], (data) => [
        // @ts-expect-error todo: fix this `unknown` type
        ...data,
        {
          id: "3",
          name: "Product 3",
          seller: {
            id: "1002",
            name: "Store 3",
          },
        },
      ]);
    },
  });

  const updateProductNameMutationOptimistic = useMutation({
    meta: {
      normalize: false,
    },
    mutationFn: async () => {
      await sleep();

      return {
        id: "1",
        name: "Product 1 (Updated)",
      };
    },
    onMutate: () => ({
      optimisticData: {
        id: "1",
        name: "Product 1 (Updated)",
      },
      rollbackData: {
        id: "1",
        name: "Product 1",
      },
    }),
  });

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-8 text-4xl font-bold">
        [W.I.P] Tanstack/tRPC Admin Product Inventory Management
      </h1>
      <div>
        <Button
          onClick={() => {
            updateProductNameMutation.mutate();
          }}
          type="button"
          variant="secondary"
        >
          Update product name{" "}
          {updateProductNameMutation.isPending && "loading....."}
        </Button>{" "}
        <Button
          onClick={() => {
            updateProductSellerMutation.mutate();
          }}
          type="button"
          variant="secondary"
        >
          Update product seller{" "}
          {updateProductSellerMutation.isPending && "loading....."}
        </Button>{" "}
        <Button
          onClick={() => {
            addProductMutation.mutate();
          }}
          type="button"
          variant="secondary"
        >
          Add product {addProductMutation.isPending && "loading....."}
        </Button>{" "}
        <Button
          onClick={() => {
            updateProductNameMutationOptimistic.mutate();
          }}
          type="button"
          variant="secondary"
        >
          Update product name optimistic
        </Button>
        <Button
          onClick={() => {
            queryNormalizer.setNormalizedData({
              seller: {
                id: "1000",
                name: "Store 1 (Updated)",
              },
            });
          }}
          type="button"
          variant="secondary"
        >
          Update "Store 1" name manually
        </Button>
        <hr className="my-4" />
        <h2 className="mb-4 text-2xl font-bold">
          {t("products-admin.products")}
        </h2>
        <TanstackProducts />
        <hr className="my-4" />
        {}
        {productData && (
          <>
            <h2 className="mb-4 text-2xl font-bold">
              {t("products-admin.productDetails")}
            </h2>
            <div
              className={`
                rounded bg-zinc-200 p-4 shadow

                dark:bg-zinc-900
              `}
            >
              <span className="font-semibold">{productData.nameLong}</span>
              {}
              {productData.seller && (
                <span className="opacity-70"> - {productData.seller.name}</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
