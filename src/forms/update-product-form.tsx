"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FileWithPreview } from "~/types";
import { catchError, isArrayOfFile } from "~/utils";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { z } from "zod";

import { products, type Product } from "~/data/db/schema";
import { productSchema } from "~/data/validations/product";
import { FileDialog } from "~/islands/file-dialog";
import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "~/islands/primitives/form";
import { Input } from "~/islands/primitives/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/islands/primitives/select";
import { Textarea } from "~/islands/primitives/textarea";
import { Zoom } from "~/islands/zoom-image";
import {
  checkProductAction,
  deleteProductAction,
  updateProductAction,
} from "~/server/actions/product";
import { getSubcategories } from "~/server/config/products";
import { useUploadThing } from "~/utils/other/uploads/uploadthing";

interface UpdateProductFormProps {
  product: Product;
}

type Inputs = z.infer<typeof productSchema>;

export function UpdateProductForm({ product }: UpdateProductFormProps) {
  // todo: fix strange product images browser console warning message:
  // todo: "Ignoring unsupported entryTypes: largest-contentful-paint"

  const router = useRouter();
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (product.images && product.images.length > 0) {
      setFiles(
        product.images.map((image) => {
          const file = new File([], image.name, {
            type: "image",
          });
          const fileWithPreview = Object.assign(file, {
            preview: image.url,
          });

          return fileWithPreview;
        }),
      );
    }
  }, [product]);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: (err) => {
      const errorMessage = `An unknown error occurred during image updating (${err.message})`;
      console.error("❌ Image update error:", errorMessage);
      toast.error(errorMessage);
      throw new Error(err.message);
    },
    onClientUploadComplete: (res) => {
      if (!res) return;
      toast.success("Your images were updated successfully");
    },
  });

  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: product.category,
      subcategory: product.subcategory,
    },
  });

  const subcategories = getSubcategories(form.watch("category"));

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const checkResult = await checkProductAction({
          name: data.name,
          id: product.id,
        });

        if (checkResult && checkResult.status === "error") {
          toast.error(checkResult.message);
          return; // Stop further execution
        }

        const images =
          isArrayOfFile(data.images) ?
            await startUpload(data.images).then((res) => {
              const formattedImages = res?.map((image) => ({
                id: image.key,
                name: image.key.split("_")[1] ?? image.key,
                url: image.url,
              }));
              return formattedImages ?? null;
            })
          : null;

        await updateProductAction({
          ...data,
          storeId: product.storeId,
          id: product.id,
          images: images ?? product.images,
        });

        toast.success("Product updated successfully.");
        setFiles(null);
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem>
          <FormLabel>Name</FormLabel>
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
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Type product description here."
              {...form.register("description")}
              defaultValue={product.description ?? ""}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.description?.message}
          />
        </FormItem>
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }
                    defaultValue={product.category}
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(products.category.enumValues).map(
                          (option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              className="capitalize"
                            >
                              {option}
                            </SelectItem>
                          ),
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Subcategory</FormLabel>
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
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormItem className="w-full">
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Type product price here."
                {...form.register("price")}
                defaultValue={product.price}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.price?.message}
            />
          </FormItem>
          <FormItem className="w-full">
            <FormLabel>Inventory</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Type product inventory here."
                {...form.register("inventory", { valueAsNumber: true })}
                defaultValue={product.inventory}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.inventory?.message}
            />
          </FormItem>
        </div>
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          {process.env.NODE_ENV === "development" && (
            <span className="font-mono text-red-500">
              {/* [localhost-notice] Upload button is hidden if UploadThing env are missing. */}
              [localhost-notice] Ensure you have UploadThing's environment
              variables.
            </span>
          )}
          {files?.length ?
            <div className="flex items-center gap-2">
              {files.map((file, i) => (
                <Zoom key={i}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="h-20 w-20 shrink-0 rounded-lg object-cover object-center"
                    width={80}
                    height={80}
                  />
                </Zoom>
              ))}
            </div>
          : null}
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="images"
              maxFiles={3}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              isUploading={isUploading}
              disabled={isPending}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message}
          />
        </FormItem>
        <div className="flex space-x-2">
          <Button disabled={isPending}>
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Update Product
            <span className="sr-only">Update product</span>
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              startTransition(async () => {
                void form.trigger(["name", "price", "inventory"]);
                await deleteProductAction({
                  storeId: product.storeId,
                  id: product.id,
                });
                router.push(`/dashboard/stores/${product.storeId}/products`);
              });
            }}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete Product
            <span className="sr-only">Delete product</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
