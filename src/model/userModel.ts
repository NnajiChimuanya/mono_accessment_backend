import { Schema, model, Model, Document } from "mongoose";
import IUser from "../interface/userInterface";
import pkg from "validator";
const { isEmail } = pkg;
import bcrypt from "bcrypt";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, "Please input email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  code: {
    type: String,
  },
});

UserSchema.pre<IUser>("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = model<IUser>("User", UserSchema);

export default User;
