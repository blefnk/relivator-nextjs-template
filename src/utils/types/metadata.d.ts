import { Metadata } from "next";

export type GenerateMetadata = (
  params: PageParams,
) => Metadata | Promise<Metadata>;
