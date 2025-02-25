import { validate, validateRequest } from "../services/common.service.js";
import asyncHandler from "../helpers/asyncHandler.js";
import { checkIfPasswordIsCorrect, checkIfUserExists, generateAccessToken, generateRefreshToken, hashUserPassword, omitPasswordHashAndRefreshToken, updateRefreshTokenOfUser, validateRefreshToken } from "../services/auth.service.js";
import { conflict, internalServerError, unauthorized } from "../helpers/ApiError.js";
import { loginSchema, signUpSchema } from "../validators/auth.validator.js";
import UserModel from "../database/models/user.model.js";
import { successResponseWithClearCookie, successResponseWithCookies } from "../helpers/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  // steps
  // validate request
  // check if user exists already
  // hash user password
  // generate access token, refresh token
  // create user object
  // recheck if user created successfully
  // return success response with cookies

  // validation of request
  validateRequest(req);

  // validate request format
  const data = validate(req.body, signUpSchema, "Invalid or Insufficient Information for Sign Up.");
  const { username, email, password, fullname } = data;

  // check if user exists
  const existingUser = await checkIfUserExists(username, email, false);
  if (existingUser !== null) conflict("User already exists.");

  // hashing password
  const passwordHash = await hashUserPassword(password);

  // creating user object
  const user = new UserModel({
    username,
    email,
    password,
    fullname,
    passwordHash,
    role: "pioneer",
  });
  await user.save();

  // recheck if user created successfully
  const createdUser = await checkIfUserExists(username, email, false);
  if (!createdUser) internalServerError("Failed to create user.");

  // generate access token, refresh token
  const accessToken = generateAccessToken(createdUser._id);
  const refreshToken = generateRefreshToken(createdUser._id);

  // add refresh token to user
  const updatedUser = await updateRefreshTokenOfUser(createdUser._id, refreshToken);

  // omit refresh token and password hash from cookies
  const newUser = omitPasswordHashAndRefreshToken(updatedUser);

  // return success response with user and cookies
  successResponseWithCookies(res, { user: newUser }, "User registered successfully.", {
    accessToken,
    refreshToken
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  // steps
  // validate request
  // validation
  // check if user exists
  // check if password is correct
  // generate access refresh token
  // update refresh token in user
  // omit refresh token and password
  // send response with user and cookies

  // validation of request
  validateRequest(req);

  // validate request format
  const data = validate(req.body, loginSchema, "Invalid or Insufficient Information for Log In.");
  const { username, email, password } = data;

  // check if user exists
  const existingUser = await checkIfUserExists(username, email);

  // check if password is correct
  checkIfPasswordIsCorrect(existingUser.passwordHash, password);

  // generate access refresh token
  const accessToken = generateAccessToken(existingUser._id);
  const refreshToken = generateRefreshToken(existingUser._id);

  // update refresh token in user
  const updatedUser = await updateRefreshTokenOfUser(existingUser._id, refreshToken);

  // omit refresh token and passwordHash from user
  const newUser = omitPasswordHashAndRefreshToken(updatedUser);

  // send success response with newUser and cookies
  successResponseWithCookies(res, { user: newUser }, "User logged in successfully.", {
    accessToken,
    refreshToken
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  // steps
  // validate request
  // validate request format
  // check if user exists
  // check if user refresh token is correct
  // log user out by invalidating refresh token stored
  // send success response with clear cookies

  // validate request
  validateRequest(req, false, true, false, true);

  // validate request format
  const { refreshToken } = req.cookies;
  if (!refreshToken) unauthorized("User credentials are not authorised for the task requested.");

  // check if user exists using refresh token, thus validating refresh token
  const existingUser = await validateRefreshToken(refreshToken);

  // log user out by invalidating refresh token stored
  await updateRefreshTokenOfUser(existingUser._id, null, true);

  // send response back
  successResponseWithClearCookie(res, {}, "User logged out successfully.");
});

export const refreshUser = asyncHandler(async (req, res) => {
  // steps
  // validate req
  // validate refresh token is correct
  // regenerate access token
  // send success response with new access token

  // validate request
  validateRequest(req, false, true, false, true);

  // check if refresh token is correct
  const user = validateRefreshToken(refreshToken);

  // generate access token
  const accessToken = generateAccessToken(user._id);

  // send success response with new access token
  successResponseWithCookies(res, {}, "Refresh successful.", { accessToken })
});