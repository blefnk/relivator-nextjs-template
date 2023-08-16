import { Metadata } from "next";

import { PageParams } from "./page-params";

export type GenerateMetadata = (
  params: PageParams
) => Metadata | Promise<Metadata>;
