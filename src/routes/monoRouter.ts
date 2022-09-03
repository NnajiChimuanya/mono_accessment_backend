import express, { Request, Response, Router } from "express";
import {
  auth,
  transactions,
  unlink,
  statement,
  expenses,
  wallets,
  shareholder,
  dataSync,
} from "../controller/mono";

const monoRouter: Router = express.Router();

monoRouter.post("/:auth", auth);

monoRouter.post("/transactions/:_id", transactions);

monoRouter.post("/dataSync/:_id", dataSync);

monoRouter.post("/unlink/:id", unlink);

monoRouter.get("/statement/:id", statement);

monoRouter.get("/expenses/:id", expenses);

monoRouter.get("/wallets/:id", wallets);

monoRouter.get("/shareholder", shareholder);

export default monoRouter;
