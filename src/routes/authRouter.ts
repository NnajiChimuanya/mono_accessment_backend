import express, { Request, Response, Router } from "express";
import { login, signup } from "../controller/auth";

const authRouter: Router = express.Router()

authRouter.post("/signup",signup)

authRouter.post("/login", login)

export default authRouter