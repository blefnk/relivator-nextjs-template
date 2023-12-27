import type { NextApiRequest, NextApiResponse } from "next";

import { currencyErrorMessages } from "./currencyErrorMessages";

export const currencyValidation = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { currency } = req.query;

  if (!currency) {
    res.status(417).send({
      error: true,
      message: currencyErrorMessages.missingCurrency,
    });

    return false;
  }

  if (req.method !== "GET") {
    res.status(405).send({
      error: true,
      message: currencyErrorMessages.methodNotAllowed,
    });

    return false;
  }

  return true;
};
