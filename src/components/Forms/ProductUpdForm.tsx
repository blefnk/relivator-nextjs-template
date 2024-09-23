"use client";

/* eslint-disable max-lines-per-function */
import type { Product } from "~/db/schema";
import type { FileWithPreview } from "~/types/store";
import type { z } from "zod";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import consola from "consola";
import { useTranslations } from "next-intl";

import { MultiUploader } from "~/components/Application/UploadThing/MultiUploader";
import { SpinnerSVG } from "~/components/Common/Icons/SVG";
import { Zoom } from "~/components/Common/zoom-image";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/text-area";
import { getSubcategories } from "~/constants/products";
import { products } from "~/db/schema";
import { env } from "~/env";
import {
  checkProductAction,
  deleteProductAction,
} from "~/server/actions/deprecated/product-old";
import { catchError } from "~/server/helpers/auth-error";
import { productSchema } from "~/server/validations/deprecated/product-old";

type ProductUpdFormProps = {
  product: Product;
};

type Inputs = z.infer<typeof productSchema>;

export function ProductUpdForm({ product }: ProductUpdFormProps) {
  const t = useTranslations();

  // todo: fix strange product images browser console warning message:
  // todo: "Ignoring unsupported entryTypes: largest-contentful-paint"
  const router = useRouter();
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setFiles(
        product.images.map((image) => {
          const file = new File([], image.name, {
            type: "image",
          });

          return Object.assign(file, {
            preview: image.url,
          });
        }),
      );
    }
  }, [product]);

  // const { isUploading } = useUploadThing("imageUploader", {
  //   onClientUploadComplete: (res) => {
  //     if (!res) {
  //       return;
  //     }
  //     consola.success("The images were updated successfully");
  //   },
  //   onUploadError: (error) => {
  //     consola.error(getErrorMessage);
  //   },
  // });
  const form = useForm<Inputs>({
    defaultValues: {
      // @ts-expect-error TODO: Fix ts
      category: product.category || "clothing",
      // @ts-expect-error TODO: Fix ts
      subcategory: product.subcategory,
    },
    resolver: zodResolver(productSchema),
  });

  // @ts-expect-error TODO: Fix ts
  const subcategories = getSubcategories(form.watch("category"));

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const checkRes = await checkProductAction({
          id: Number.parseInt(product.id),
          name: data.name,
        });

        if (checkRes && checkRes.status === "error") {
          consola.error(checkRes.message);
        }

        consola.success("Product updated successfully.");

        // Stop further execution

        return;
      } catch (error) {
        catchError(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...arguments_) =>
          void form.handleSubmit(onSubmit)(...arguments_)
        }
      >
        <FormItem>
          <FormLabel>{t("ProductUpdForm.name")}</FormLabel>
          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.name}
              placeholder="Type product name here."
              {...form.register("name")}
              defaultValue={product.name}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.name?.message}
          />
        </FormItem>
        <FormItem>
          <FormLabel>{t("ProductUpdForm.description")}</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Type product description here."
              {...form.register("description")}
              defaultValue={product.description || ""}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.description?.message}
          />
        </FormItem>
        <div
          className={`
            flex flex-col items-start gap-6

            sm:flex-row
          `}
        >
          <FormField
            // @ts-expect-error TODO: Fix ts
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("ProductUpdForm.category")}</FormLabel>
                <FormControl>
                  <Select
                    // @ts-expect-error TODO: Fix ts
                    defaultValue={product.category || "clothing"}
                    // @ts-expect-error TODO: Fix ts
                    value={field.value}
                    onValueChange={(value: typeof field.value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="capitalize">
                      {/* @ts-expect-error TODO: Fix ts */}
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    {/* <SelectContent>
                      <SelectGroup>
                        {Object.values(products.category.enumValues).map(
                          (option) => (
                            <SelectItem
                              key={option}
                              className="capitalize"
                              value={option}
                            >
                              {option}
                            </SelectItem>
                          ),
                        )}
                      </SelectGroup>
                    </SelectContent> */}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="subcategory"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("ProductUpdForm.subcategory")}</FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {subcategories.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div
          className={`
            flex flex-col items-start gap-6

            sm:flex-row
          `}
        >
          <FormItem className="w-full">
            <FormLabel>{t("ProductUpdForm.price")}</FormLabel>
            <FormControl>
              <Input
                inputMode="numeric"
                placeholder="Type product price here."
                type="number"
                {...form.register("price")}
                defaultValue={product.price}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.price?.message}
            />
          </FormItem>
          <FormItem className="w-full">
            <FormLabel>{t("ProductUpdForm.inventory")}</FormLabel>
            <FormControl>
              <Input
                inputMode="numeric"
                placeholder="Type product inventory here."
                type="number"
                {...form.register("inventory", {
                  valueAsNumber: true,
                })}
                defaultValue={product.inventory}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.inventory?.message}
            />
          </FormItem>
        </div>
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>{t("ProductUpdForm.images")}</FormLabel>
          {env.NODE_ENV === "development" && (
            <span className="font-mono text-red-500">
              {/* [localhost-notice] Upload button is hidden if UploadThing env are missing. */}
              [localhost-notice] Ensure you have UploadThing's environment
              variables.
            </span>
          )}
          {files && files.length > 0 ? (
            <div className="flex items-center gap-2">
              {files.map((file, index) => (
                <Zoom key={index}>
                  <Image
                    className={`
                      size-20 shrink-0 rounded-lg object-cover object-center
                    `}
                    alt={file.name}
                    height={80}
                    src={file.preview}
                    width={80}
                  />
                </Zoom>
              ))}
            </div>
          ) : null}
          <FormControl>
            {/* <FileDialog
              disabled={isPending}
              files={files}
              isUploading={isUploading}
              maxFiles={3}
              maxSize={1024 ** 2 * 4}
              name="images"
              setFiles={setFiles}
              setValue={form.setValue}
            /> */}
            <MultiUploader />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message}
          />
        </FormItem>
        <div className="flex space-x-2">
          <Button disabled={isPending}>
            {isPending && (
              <SpinnerSVG
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Update Product
            <span className="sr-only">{t("ProductUpdForm.updateProduct")}</span>
          </Button>
          <Button
            disabled={isPending}
            variant="destructive"
            onClick={() => {
              startTransition(async () => {
                void form.trigger(["name", "price", "inventory"]);
                await deleteProductAction({
                  // @ts-expect-error TODO: fix id type
                  id: product.id,
                  // @ts-expect-error TODO: Fix ts
                  storeId: product.storeId,
                });
                router.push(`/dashboard/stores/${product.storeId}/products`);
              });
            }}
          >
            {isPending && (
              <SpinnerSVG
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete Product
            <span className="sr-only">{t("ProductUpdForm.deleteProduct")}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
