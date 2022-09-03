"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mono_1 = require("../controller/mono");
const monoRouter = express_1.default.Router();
monoRouter.post("/:auth", mono_1.auth);
monoRouter.post("/transactions/:_id", mono_1.transactions);
monoRouter.post("/dataSync/:_id", mono_1.dataSync);
monoRouter.post("/unlink/:id", mono_1.unlink);
monoRouter.get("/statement/:id", mono_1.statement);
monoRouter.get("/expenses/:id", mono_1.expenses);
monoRouter.get("/wallets/:id", mono_1.wallets);
monoRouter.get("/shareholder", mono_1.shareholder);
exports.default = monoRouter;
