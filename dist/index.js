"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_js_1 = __importDefault(require("./routes/authRouter.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
try {
    mongoose_1.default.connect("mongodb://localhost:27017");
    console.log("Connected");
}
catch (err) {
    console.log(err);
    process.exit(1);
}
app.get("/", (req, res) => res.send("This is the begining of the mono backend"));
app.use("/auth", authRouter_js_1.default);
app.listen(3001, () => console.log("Now listening"));
