import { Request, Response, Router } from "express";
import IUser from "../interface/userInterface";
import User from "../model/userModel";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";
import { Interface } from "readline";
import bcrypt from "bcrypt";

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
  const { email, password, firstName, lastName } = req.body;

  try {
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
    });
    const token = createToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 3 * 24 * 60 * 60,
    });
    res.cookie("email", newUser.email, {
      httpOnly: true,
      maxAge: 1000 * 3 * 24 * 60 * 60,
    });
    res.status(200).json({ status: "SUCCESS" });
  } catch (error: any) {
    let errors = handleError(error);
    res.status(401).json({ errors });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  try {
    if (user) {
      let auth = await bcrypt.compare(password, user.password);

      if (auth) {
        let token = createToken(user._id);
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 3 * 24 * 60 * 60,
        });
        res.cookie("userEmail", user.email, {
          httpOnly: true,
          maxAge: 1000 * 3 * 24 * 60 * 60,
        });
        res.status(200).json({ status: "SUCCESS" });
      } else {
        throw Error("Invalid password");
      }
    } else {
      throw Error(" Email not found");
    }
  } catch (err) {
    let error = handleError(err);
    res.status(401).json({ error });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", { maxAge: 1 });
  res.json({
    status: "logged out",
  });
};
