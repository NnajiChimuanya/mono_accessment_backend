import { Request, Response, Router } from "express";
import IUser from "../interface/userInterface";
import User from "../model/userModel";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";
import { Interface } from "readline";

const createToken = (id: any) => {
  return jwt.sign({ id }, "76149494ABMICTU", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const handleError = (err: any) => {
  let error = { email: "", password: "" };

  //debugging for viewing error
  //console.log(err.message, err.code);

  if (err.code === 11000) {
    error["email"] = "email already exists";
  }

  if (err.message === " Email not found") {
    error["email"] = "email does not exist";
  }

  if (err.message === "Invalid password") {
    error["password"] = "invalid password";
  }

  if (err.message.includes("Please enter password")) {
    error["password"] = "Enter password password";
  }

  if (err.message.includes("Email already exists")) {
    error["email"] = "Email already exists";
  }

  return error;
};

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({
      email,
      password,
    });
    const token = createToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 3 * 24 * 60 * 60,
    });
    res.status(200).json({ user: newUser });
  } catch (error: any) {
    let errors = handleError(error);
    res.status(401).json({ errors });
  }
};

export const login = (req: Request, res: Response) => {
  res.send("login page");
};
