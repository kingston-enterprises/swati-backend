import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name: {
      type: String,
      required: [true, "First name required"],
      lowercase: true
    },
    last_name: {
      type: String,
      required: [true, "Last name required"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true, // Ensure emails are unique
      trim: true, // Remove leading/trailing whitespace
      lowercase: true, // Store emails in lowercase
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ], // Basic email validation
    },
    phone_number: {
      type: String,
      required: [true, "Please add a valid Eswatini registered Phone number"],
      unique: true, // Ensure phone numbers are unique
    },
    password: {
      type: String,
      required: [true, "Please add a valid password"],
    },
  }, { timestamps: true })
);

export default User;
