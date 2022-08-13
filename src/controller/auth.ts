import{ Request, Response, Router } from "express";
import IUser from "../interface/userInterface";
import User from "../model/userModel";

export const signup = async(req:Request, res:Response) => {
   const {email, password} = req.body
   const user: IUser = await User.create({
    email,
    password
   })
 res.json(user)
   
}

export const login = (req:Request, res:Response) => {
    res.send("login page")
}

