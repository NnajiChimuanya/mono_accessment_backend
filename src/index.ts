import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cookieParser());

try {
  mongoose.connect("mongodb://localhost:27017/mono", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected");
} catch (err) {
  console.log(err);
  process.exit(1);
}

app.get("/", (req: Request, res: Response) =>
  res.send("This is the begining of the mono backend")
);
app.use("/auth", authRouter);

app.listen(3001, () => console.log("Now listening"));
