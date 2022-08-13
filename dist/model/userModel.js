"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const { isEmail } = validator_1.default;
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Please input email"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [6, "minimum password length is 6"],
    },
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
