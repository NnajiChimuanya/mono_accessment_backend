import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import monoRouter from "./routes/monoRouter.js";
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
  })
);

// "https://mono-accessment-frontend.vercel.app"

try {
  mongoose.connect("mongodb://localhost:27017/mono");
  console.log("Connected");
} catch (err) {
  console.log(err);
  process.exit(1);
}

app.get("/", (req: Request, res: Response) =>
  res.send("This is the begining of the mono backend")
);
app.use("/auth", authRouter);

app.use("/code", monoRouter);

app.listen(port, () => console.log("Now listening"));
