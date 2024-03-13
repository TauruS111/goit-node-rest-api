import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  register,
  login,
  logout,
  getCurrent,
} from "../controllers/userControllers.js";
import { registerSchema, loginSchema } from "../schemas/userSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(registerSchema), register);
userRouter.post("/login", validateBody(loginSchema), login);
userRouter.post("/logout", authenticate, logout);
userRouter.post("/current", authenticate, getCurrent);

export default userRouter;
