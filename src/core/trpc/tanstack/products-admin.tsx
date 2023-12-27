"use client";

import React from "react";
import { useQueryNormalizer } from "@normy/react-query";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { Button } from "~/islands/primitives/button";
import { getServerAuthSession } from "~/utils/auth/users";

/** @see https://github.com/klis87/normy#readme */

const sleep = () => new Promise((resolve) => setTimeout(resolve, 10));

const TanstackProducts = () => {
  const { data: productsData = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      Promise.resolve([
        { id: "0", name: "Product 0", seller: null },
        { id: "1", name: "Product 1", seller: { id: "1000", name: "Store 1" } },
        { id: "2", name: "Product 2", seller: { id: "1001", name: "Store 2" } },
      ]),
  });

  return (
    <div className="space-y-2">
      {productsData.map((product) => (
        <div
          key={product.id}
          className="rounded bg-zinc-200 p-4 shadow dark:bg-zinc-900"
        >
          <span className="font-semibold">{product.name} </span>
          {product.seller && (
            <>
              - <span className="opacity-70"> {product.seller.name}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default function ProductsAdminManagement() {
  const queryClient = useQueryClient();
  const queryNormalizer = useQueryNormalizer();

  const { data: productData } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      Promise.resolve({
        id: "1",
        name: "Product 1",
        seller: { id: "1000", name: "Store 1" },
      }),
    select: (data) => ({ ...data, nameLong: data.name, name: undefined }),
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
        seller: { id: "1004", name: "Store 4 (new)" },
      };
    },
  });
  const addProductMutation = useMutation({
    mutationFn: async () => {
      await sleep();
      return {
        id: "3",
        name: "Product 3",
        seller: { id: "1002", name: "Store 3" },
      };
    },
    onSuccess: () => {
      queryClient.setQueryData(["products"], (data) =>
        // @ts-expect-error todo: fix this `unknown` type
        // eslint-disable-next-line unicorn/prefer-spread
        data.concat({
          id: "3",
          name: "Product 3",
          seller: { id: "1002", name: "Store 3" },
        }),
      );
    },
  });

  const updateProductNameMutationOptimistic = useMutation({
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
    meta: {
      normalize: false,
    },
  });

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-8 text-4xl font-bold">
        [W.I.P] Tanstack/tRPC Admin Product Inventory Management
      </h1>
      <div>
        <Button
          type="button"
          onClick={() => updateProductNameMutation.mutate()}
          variant="secondary"
        >
          Update product name{" "}
          {updateProductNameMutation.isPending && "loading....."}
        </Button>{" "}
        <Button
          type="button"
          onClick={() => updateProductSellerMutation.mutate()}
          variant="secondary"
        >
          Update product seller{" "}
          {updateProductSellerMutation.isPending && "loading....."}
        </Button>{" "}
        <Button
          type="button"
          onClick={() => addProductMutation.mutate()}
          variant="secondary"
        >
          Add product {addProductMutation.isPending && "loading....."}
        </Button>{" "}
        <Button
          type="button"
          onClick={() => updateProductNameMutationOptimistic.mutate()}
          variant="secondary"
        >
          Update product name optimistic
        </Button>
        <Button
          type="button"
          onClick={() =>
            queryNormalizer.setNormalizedData({
              seller: { id: "1000", name: "Store 1 (Updated)" },
            })
          }
          variant="secondary"
        >
          Update "Store 1" name manually
        </Button>
        <hr className="my-4" />
        <h2 className="mb-4 text-2xl font-bold">Products</h2>
        <TanstackProducts />
        <hr className="my-4" />
        {productData && (
          <>
            <h2 className="mb-4 text-2xl font-bold">Product Details</h2>
            <div className="rounded bg-zinc-200 p-4 shadow dark:bg-zinc-900">
              <span className="font-semibold">{productData.nameLong}</span>
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
