import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { AnyZodObject, ZodError } from "zod";

export const parseAndValidateReqBody =
  (schema: AnyZodObject, handler: NextApiHandler) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      return handler(req, res);
    } catch (ex) {
      if (ex instanceof ZodError) {
        return res.status(400).send({
          message: ex.message,
        });
      }
      return res.status(500).send({
        message: "Error parsing and validating body",
      });
    }
  };
