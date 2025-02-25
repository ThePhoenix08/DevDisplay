import Constants from "../constants.js";
import { z } from "zod";

// conditions the regex imposes
// must be 8 characters long
// contain atleast one uppercase letter
// constain atleast one lowercase
// contain atleast one number
// can only contain @ as special charactor
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@]{8,}$/;
const passwordInvalidMsg = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and can only contain @ as a special character";

const signUpSchema = z.object({
  username: z
    .string()
    .min(Constants.USERNAME_MINLEN, "Username must be larger than 3 charactors."),
  email: z
    .string()
    .email("Provide a valid email address."),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters long.")
    .regex(passwordRegex, passwordInvalidMsg),
  fullname: z
    .string()
    .min(2, "Fullname must be atleast 2 charactors long.")
});

const loginSchema = z.object({
  username: z
    .string()
    .min(Constants.USERNAME_MINLEN, "Username must be larger than 3 charactors."),
  email: z
    .string()
    .email("Provide a valid email address."),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters long.")
    .regex(passwordRegex, passwordInvalidMsg),
}).refine((data) => data.email || data.username, {
  message: "Either username or email shall be present.",
  path: ["username", "email"],
});

export { signUpSchema, loginSchema };