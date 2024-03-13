import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  register,
  login,
  logout,
  getCurrent,
  uploadAvatar,
} from "../controllers/userControllers.js";
import { registerSchema, loginSchema } from "../schemas/userSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(registerSchema), register);
userRouter.post("/login", validateBody(loginSchema), login);
userRouter.post("/logout", authenticate, logout);
userRouter.get("/current", authenticate, getCurrent);
userRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  uploadAvatar
);

export default userRouter;
