"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, "76149494ABMICTU", {
        expiresIn: 3 * 24 * 60 * 60,
    });
};
const handleError = (err) => {
    let error = { error: "An error occurred" };
    //debugging for viewing error
    //console.log(err.message, err.code);
    if (err.code === 11000) {
        error = {
            error: "email already exists",
        };
    }
    if (err.message === " Email not found") {
        error = {
            error: "email does not exist",
        };
    }
    if (err.message === "Invalid password") {
        error = {
            error: "Invalid password",
        };
    }
    if (err.message.includes("Please enter password")) {
        error = {
            error: "please enter password",
        };
    }
    if (err.message.includes("Email already exists")) {
        error = {
            error: "Email already exists",
        };
    }
    return error;
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = req.body;
    try {
        const newUser = yield userModel_1.default.create({
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
    }
    catch (error) {
        let errors = handleError(error);
        res.json({ errors });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = yield userModel_1.default.findOne({ email });
    try {
        if (user) {
            let auth = yield bcrypt_1.default.compare(password, user.password);
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
            }
            else {
                throw Error("Invalid password");
            }
        }
        else {
            throw Error(" Email not found");
        }
    }
    catch (err) {
        let error = handleError(err);
        res.json({ error });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "", { maxAge: 1 });
    res.json({
        status: "logged out",
    });
});
exports.logout = logout;
