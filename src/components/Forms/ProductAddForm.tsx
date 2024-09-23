"use client";

import type { FileWithPreview } from "~/types/store";
import type { z } from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import consola from "consola";
import { useTranslations } from "next-intl";

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
import { checkProductAction } from "~/server/actions/deprecated/product-old";
import { catchError } from "~/server/helpers/auth-error";
import { productSchema } from "~/server/validations/deprecated/product-old";

// import { FileDialog } from "~/components/Common/file-dialog";
// import { UploadButton } from "~/utils/uthing";
type Inputs = z.infer<typeof productSchema>;

// eslint-disable-next-line max-lines-per-function
export function ProductAddForm() {
  const t = useTranslations();

  // todo: fix strange product images browser console warning message:
  // todo: "Ignoring unsupported entryTypes: largest-contentful-paint"
  // const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const [files] = useState<FileWithPreview[] | null>(null);
  const [isPending, startTransition] = useTransition();

  // const { isUploading } = useUploadThing("imageUploader", {
  //   onClientUploadComplete: (res) => {
  //     if (!res) {
  //       return;
  //     }
  //     consola.success("The images were uploaded successfully");
  //   },
  //   onUploadError: (error) => {
  //     consola.error("An error occurred while uploading images.");
  //     throw new Error(error.message);
  //   },
  // });
  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      // @ts-expect-error TODO: Fix ts
      category: "clothing",
      description: "",
      images: [],
      inventory: Number.NaN,
      price: "",
      subcategory: "",
    },
    resolver: zodResolver(productSchema),
  });

  // @ts-expect-error TODO: Fix ts
  const subcategories = getSubcategories(form.watch("category"));

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const checkRes = await checkProductAction({
          name: data.name,
        });

        if (checkRes && checkRes.status === "error") {
          consola.error(checkRes.message);
        }

        return;

        // Stop further execution
      } catch (error) {
        catchError(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("ProductAddForm.name")}</FormLabel>
              <FormControl>
                <Input placeholder="Type product name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("ProductAddForm.description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type product description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <FormLabel>{t("ProductAddForm.category")}</FormLabel>
                <Select
                  // @ts-expect-error TODO: Fix ts
                  value={field.value}
                  onValueChange={(value: typeof field.value) => {
                    field.onChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      {/* @ts-expect-error TODO: Fix ts */}
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="subcategory"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("ProductAddForm.subcategory")}</FormLabel>
                <Select
                  value={field.value?.toString()}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                  </FormControl>
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
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("ProductAddForm.price")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type product price here."
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="inventory"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("ProductAddForm.inventory")}</FormLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    placeholder="Type product inventory here."
                    type="number"
                    value={Number.isNaN(field.value) ? "" : field.value}
                    onChange={(event_) => {
                      field.onChange(event_.target.valueAsNumber);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>{t("ProductAddForm.images")}</FormLabel>
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
            {/* UPLOADTHING <1.2.6 OLD IMPLEMENTATION */}
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
            {/* TODO: UPLOADTHING 1.2.6-1.3.0 NEW IMPLEMENTATION */}
            {/* <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the res
                consola.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            /> */}
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message}
          />
        </FormItem>
        <Button
          className="w-fit"
          disabled={isPending}
          onClick={() =>
            void form.trigger(["name", "description", "price", "inventory"])
          }
        >
          {isPending && (
            <SpinnerSVG
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add Product
          <span className="sr-only">{t("ProductAddForm.addProduct")}</span>
        </Button>
      </form>
    </Form>
  );
}
