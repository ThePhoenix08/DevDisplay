// API error helper functions
class ApiError extends Error {
  constructor(message, errorType = 'UNSPECIFIED', status = 500, errors = null) {
    super(message);
    this.message = message;
    this.errorType = errorType;
    this.status = status;
    this.errors = errors;
  }

  toJSON() {
    return {
      message: this.message,
      errorType: this.errorType,
      status: this.status,
      errors: this.errors,
    };
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  log() {
    
  }
}

const badRequest = (message, errors) => {
  throw new ApiError(message, "BAD_REQUEST", 400, errors);
};

const validationError = (message, errors) => {
  throw new ApiError(message, "VALIDATION_ERROR", 400, errors);
};

const semanticError = (message, errors) => {
  throw new ApiError(message, "SEMANTIC_ERROR", 422, errors);
};

const unauthorized = (message, errors) => {
  throw new ApiError(message, "UNAUTHORIZED", 401, errors);
};

const forbidden = (message, errors) => {
  throw new ApiError(message, "FORBIDDEN", 403, errors);
};

const notFound = (message, errors) => {
  throw new ApiError(message, "NOT_FOUND", 404, errors);
};

const conflict = (message, errors) => {
  throw new ApiError(message, "CONFLICT", 409, errors);
};

const internalServerError = (message, errors) => {
  throw new ApiError(message, "INTERNAL_SERVER_ERROR", 500, errors);
};

const unsupportedMediaType = (message, errors) => {
  throw new ApiError(message, "UNSUPPORTED_MEDIA_TYPE", 415, errors);
};

export {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  internalServerError,
  validationError,
  semanticError,
  unsupportedMediaType,
};