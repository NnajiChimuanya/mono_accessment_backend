import { Schema, model, Model, Document } from "mongoose";
import IUser from "../interface/userInterface";
import pkg from "validator";
const { isEmail } = pkg;





const UserSchema: Schema = new Schema({
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
})

const User = model<IUser>("User", UserSchema)

export default User