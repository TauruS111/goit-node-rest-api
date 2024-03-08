import HttpError from "./HttpError.js";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(404));
  }
  next();
};
