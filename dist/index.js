"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const authRouter_js_1 = __importDefault(require("./routes/authRouter.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const monoRouter_js_1 = __importDefault(require("./routes/monoRouter.js"));
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
}));
// "https://mono-accessment-frontend.vercel.app"
try {
    mongoose_1.default.connect("mongodb://localhost:27017/mono");
    console.log("Connected");
}
catch (err) {
    console.log(err);
    process.exit(1);
}
app.get("/", (req, res) => res.send("This is the begining of the mono backend"));
app.use("/auth", authRouter_js_1.default);
app.use("/code", monoRouter_js_1.default);
app.listen(port, () => console.log("Now listening"));
