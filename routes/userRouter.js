import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  register,
  login,
  logout,
  getCurrent,
  uploadAvatar,
  verify,
  sentVerifyMail,
} from "../controllers/userControllers.js";
import {
  registerSchema,
  loginSchema,
  verifySchema,
} from "../schemas/userSchemas.js";
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
userRouter.get("/verify/:verifyCode", verify);
userRouter.post("/verify", validateBody(verifySchema), sentVerifyMail);

export default userRouter;
