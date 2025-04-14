import { Request, Response } from 'express';
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken, lowercaseObjectStrings } from "../utils/index";



interface SignInRequestBody {
  email: string;
  password: string;
}


/**
 * @function signIn
 * @desc    Logs in a user with email and password.
 *          Performs credential validation and generates a token on success.
 * @route   POST /v1/auth/signup/
 * @access  Public
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object for sending responses.
 * @throws {Error} - Throws an error with a message if credentials are invalid.
 */
export const signIn = async (
        req: any
      , res: any
      ) => {      
 
  const { phone_number } = lowercaseObjectStrings(req.body);
  const { password } = req.body; 
 
  // Check for user email
  const user = await User.findOne({ phone_number });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.setHeader("authToken", generateToken(user._id)).json({
      status: 200,
      appCode: 1,
      data: {
        _id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
      },
      message: "Successfully logged in",
    });
  } else {
    res.status(400).json({message: "Invalid Credentials"})
  }
};

interface SignUpRequestBody {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
}/**
 * @function signUp
 * @desc    Registers a new user with provided details.
 *          Hashes the password before saving the user to the database.
 *          Generates a token on successful registration.
 * @route   POST /v1/auth/signup/
 * @access  Public
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object for sending responses.
 * @throws {Error} - Throws an error with a message if user already exists or data is invalid.
 */
export const signUp =async (
        req: any
      , res: any
      ) => {
  
  const { first_name, last_name, email, phone_number } = lowercaseObjectStrings(req.body);
  const { password } = req.body;

  if (!first_name || !last_name || !email || !phone_number || !password) {
    // res.status(400);
    // throw new Error("Please add all fields");

    return res.status(400).json({message: "Please add all fields"})
  }

  // Check if user exists
  const userExists = await User.findOne({ phone_number }) || await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({message: "User already exists"})
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    first_name,
    last_name,
    email,
    phone_number,
    password: hashedPassword,
  });

  if (user) {
    res.setHeader("authToken", generateToken(user._id)).json({
      status: 200,
      appCode: 1,
      data: {
        _id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
      },
      message: "Successfully logged in",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};
