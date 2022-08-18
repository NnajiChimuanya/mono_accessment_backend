import express, { Request, Response, Router } from "express";
import { login, signup, logout } from "../controller/auth";

const authRouter: Router = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.get("/logout", logout);

export default authRouter;
