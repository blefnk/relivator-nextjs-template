import type { NextApiRequest, NextApiResponse } from "next";

import { errorMessage } from "@/server/reliverse/currency/errorMessage";

export const currencyValidation = (
  request: NextApiRequest,
  res: NextApiResponse,
) => {
  const { currency } = request.query;

  if (!currency) {
    res.status(417).send({
      error: true,
      message: errorMessage.missingCurrency,
    });

    return false;
  }

  if (request.method !== "GET") {
    res.status(405).send({
      error: true,
      message: errorMessage.methodNotAllowed,
    });

    return false;
  }

  return true;
};
