import Joi from "joi";

export const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

export const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

export const verifySchema = Joi.object({
  email: Joi.string().required(),
});
