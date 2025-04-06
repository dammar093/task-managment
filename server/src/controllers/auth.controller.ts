import { Request, Response } from "express";
import bcrypt from "bcrypt";
import ErrorHandler from "../utils/apiError";
import asyncHander from "../utils/asyncHanler";
import jwt from "jsonwebtoken";
import { db } from ".."



// controller for registering user

export const register = asyncHander(
  async (req: Request, res: Response) => {

    // destructure the request body
    const { name, email, password } = req?.body;
    // check field are not empty
    if (!name || !email || !password) {
      throw new ErrorHandler(400, "Please fill all fields");
    }
    // check the email is valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ErrorHandler(400, "Please enter a valid email");
    }
    // check the password length at least 6 characters
    if (password.length < 6) {
      throw new ErrorHandler(400, "Password must be at least 6 characters");
    }
    try {
      // check if the user already exists with the same email
      const existUser = await db.user.findUnique({
        where: {
          email: email,
        },
      });
      if (existUser) {
        throw new ErrorHandler(400, "User already exists");
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // create the user
      const user = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return res.status(201).json({
        statusCode: 201,
        data: null,
        message: "User created successfully",
      })
    } catch (error: any) {
      throw new ErrorHandler(500, error.message);
    }
  }
)
// controller for login user
export const login = asyncHander(
  async (req: Request, res: Response) => {
    // destructure the request body
    const { email, password } = req?.body;
    // check field are not empty
    if (!email || !password) {
      throw new ErrorHandler(400, "Please fill all fields");
    }
    // check the email is valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ErrorHandler(400, "Please enter a valid email");
    }
    // check the password length at least 6 characters
    if (password.length < 6) {
      throw new ErrorHandler(400, "Password must be at least 6 characters");
    }
    try {
      //finde user 
      const user = await db.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new ErrorHandler(400, "Invalid credentials");
      }
      // check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password as string);
      if (!isMatch) {
        throw new ErrorHandler(400, "Invalid credentials");
      }
      // create a token
      const token = jwt.sign(
        user?.id,
        process.env.JWT_SECRET!
      )
      // set the cookie
      return res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }).status(200).json({
        statusCode: 200,
        data: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          token: token,
        },
        message: "Login successfully",
      })
    } catch (error: any) {
      return res.status(500).json({
        statusCode: 500,
        data: null,
        message: error.message,
      });
    }
  }
)

export const logout = asyncHander(
  async (req: Request, res: Response) => {
    try {
      // clear the cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.status(200).json({
        statusCode: 200,
        data: null,
        message: "Logout successfully",
      });
    } catch (error: any) {
      throw new ErrorHandler(500, error.message);
    }
  }
)