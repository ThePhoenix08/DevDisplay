import asyncHandler from "../helpers/asyncHandler.js";
import { validateRequest } from "../services/common.service.js";
import UserModel from "../database/models/user.model.js";
import { unauthorized, internalServerError, badRequest } from "../helpers/ApiError.js";

const authenticate = asyncHandler(async(req, _res, next) => {
  // steps
  // validate req format
  // extract access token from req cookies
  // access token is signed with correct secret
  // access token format is correct
  // access token issuer is correct origin
  // access token has not expired

  // validate request
  validateRequest(req);

  // extract access token
  const { accessToken } = req.cookies;

  // check if access token is signed using the correct secret
  const decoded = jwt.verify(accessToken, Constants.ACCESS_TOKEN_SECRET);
  if(!decoded) {
    console.log("ACCESS_TOKEN_ERROR: Undefined");
    unauthorized('Access token is invalid or has expired');
  }

  // validate access token format
  const { iss: issuer, sub: userId, iat: issuedAt, purpose } = decoded;
  if(!userId || !issuedAt || !purpose) {
    console.log("ACCESS_TOKEN_ERROR: Wrong format");
    badRequest('Access token is invalid or has expired');
  }

  // check if access token is issued by the correct origin
  if(issuer !== Constants.ORIGIN_URL) {
    console.log("ACCESS_TOKEN_ERROR: Origin mismatch");
    unauthorized('Access token is invalid or has expired');
  }

  // check if access token has expired
  if(issuedAt + Constants.ACCESS_TOKEN_MAXAGE < Date.now()) {
    console.log("ACCESS_TOKEN_ERROR: Expired");
    unauthorized('Refresh token is invalid or has expired');
  }

  // check if user id is valid
  try {
    const user = await UserModel.findById(userId).lean();
    if (!user) throw notFound('User not found');
  } catch (error) {
    internalServerError('Failed to check if user exists');
  }

  // attach user to request
  req.user = user;

  // call next to forward middleware / route
  next();
});

export default authenticate;