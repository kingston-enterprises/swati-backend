import express from "express";
import {
  signUp,
  signIn
} from "../controllers/authController";

/**
 * @function authRouter
 * @desc    Defines routes for user authentication.
 *          Handles user signup and signin requests.
 */
const authRouter = express.Router();


authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

export default authRouter;
