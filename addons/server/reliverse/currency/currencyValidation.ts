import type { NextApiRequest, NextApiResponse } from "next";

export const currencyValidation = (
  request: NextApiRequest,
  res: NextApiResponse,
) => {
  const { currency } = request.query;

  if (!currency) {
    res.status(417).send({
      error: true,
      message: "missingCurrency",
    });

    return false;
  }

  if (request.method !== "GET") {
    res.status(405).send({
      error: true,
      message: "methodNotAllowed",
    });

    return false;
  }

  return true;
};
