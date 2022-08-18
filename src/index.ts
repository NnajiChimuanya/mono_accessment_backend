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
    origin: "https://mono-accessment-frontend.vercel.app",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
  })
);

try {
  mongoose.connect(
    "mongodb+srv://Muanyachi:76149494ABMICTU@mono.pkmxyad.mongodb.net/?retryWrites=true&w=majority"
  );
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
