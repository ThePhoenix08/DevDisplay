// standardized API response format
import Constants from "../constants.js";

class ApiResponse {
  constructor(status, message, data = null, errorType = 'UNSPECIFIED', error = null) {
    this.success = status < 300 ? true : false; // Boolean value indicating whether the request was successful or not
    this.message = message, // Brief description of the result
    this.data = data || null, // Contains the actual response data (if any)
    this.status = status || 200 // HTTP status code

    // If the environment is development, include the error details in the response
    // POLICY DECISION ?? Only include error details in response if in development mode
    if(!this.success) {
      this.error = Constants.ENV === 'development' ? error : null;
      this.errorType = Constants.ENV === 'development' ? errorType : null;
    }
  }
}

// Helper functions to send API responses
/** successResponse(res, data, message) => void */
const successResponse = (res, data, message) => {
  res.status(200).json(new ApiResponse(200, message, data));
}

/** successResponseWithCookies(res, data, message, cookies) => void */
const successResponseWithCookies = (res, data, message, cookies) => {
  const options = { httpOnly: true, secure: true, sameSite: "strict" };

  if(cookies) {
    if(cookies.accessToken) {
      res
      .status(200)
      .cookie("accessToken", cookies.accessToken, options)
      .json(new ApiResponse(200, message, data));
    }
    if(cookies.refreshToken) {
      res
      .status(200)
      .cookie("refreshToken", cookies.refreshToken, options)
      .json(new ApiResponse(200, message, data));
    }
  }
}


/** successResponseWithClearCookie(res, data, message) => void */
const successResponseWithClearCookie = (res, data, message) => {
  const options = { httpOnly: true, secure: true, sameSite: "strict" };

  res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .status(200)
    .json(new ApiResponse(200, message, data));
}

/** errorResponse(res, status, message, errorType, error) => void */
const errorResponse = (res, status, message, errorType, error) => {
  res.status(status).json(new ApiResponse(status, message, null, errorType, error));
}

export { successResponse, errorResponse, successResponseWithCookies, successResponseWithClearCookie };