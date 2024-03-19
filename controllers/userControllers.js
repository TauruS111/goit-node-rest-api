import fs from "fs/promises";
import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import Jimp from "jimp";
import sendEmail from "../helpers/sendEmail.js";
import { nanoid } from "nanoid";
import { Verify } from "crypto";
import { json } from "express";

const avatarPath = path.resolve("public", "avatars");
const { SECRETKEY } = process.env;

export const register = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = await bcrypt.hash(password, 10);

    const verificationToken = nanoid();
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify Email",
      html: `<a href = "http://localhost:3000/api/users/verify/${verificationToken}">click to verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      user: { subscription: newUser.subscription, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRETKEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token,
      user: { subscription: user.subscription, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "Logout success" });
};

export const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({ subscription, email });
};

export const uploadAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { filename, path: oldPath } = req.file;

  const newPath = path.join(avatarPath, filename);

  fs.rename(oldPath, newPath);
  const image = await Jimp.read(newPath);
  await image.resize(250, 250).writeAsync(newPath);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

export const verify = async (req, res, next) => {
  const { verifyCode } = req.params;

  const user = await User.findOne({ verificationToken: verifyCode });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.status(200).json({
    message: "Verification successful",
  });
};

export const sentVerifyMail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Duplicate verify code",
    html: `<a href = "http://localhost:3000/api/users/verify/${user.verificationToken}">click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
};
