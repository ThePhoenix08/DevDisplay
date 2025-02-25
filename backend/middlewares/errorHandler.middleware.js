import path from "path";
import { fileURLToPath } from "url";
import { ZodError } from "zod";
import Constants from "./constants.js";

import { consoleBgColoringWrapper, consoleTextColoringWrapper } from "../helpers/logging.js";
import ApiError from "../helpers/ApiError.js";
import { errorResponse } from "../helpers/ApiResponse.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.resolve(__dirname);

const errorHandler = (err, _req, res, _next) => {
  let error = err;
  const isApiError = error instanceof ApiError;
  
  if(isApiError) {
    const { message, errorType, status, errors } = error;
    const isZodError = errors[0] instanceof ZodError;

    error = isZodError ? errors[0].format() : errors[0];
    // POLICY: In case of multiple errors, we only want to show the first one.

    const stack = error?.stack?.split("\n");
    const parent = getParentFunctions(stack);

    // CONSOLE LOGGING
    if (Constants.ENV === "development") {
      console.error(consoleBgColoringWrapper("red", "------ERROR REPORT------"));
      console.error(
        `${consoleTextColoringWrapper("yellow", "Message")}: ${message || "N/A"}`
      );
      console.error(
        `${consoleTextColoringWrapper(
          "yellow",
          "Status Code"
        )}: ${statusCode || "N/A"}`
      );
      console.error(
        `${consoleTextColoringWrapper(
          "yellow",
          "Error Type"
        )}: ${errorType || "N/A"}`
      );
  
      if (details) {
        console.error(consoleTextColoringWrapper("yellow", "Details:"));
        console.dir(details, { depth: 1, colors: true });
      }
  
      if (formattedResponse.data.parent.length) {
        console.error(consoleBgColoringWrapper("blue", "Parent Functions:"));
        formattedResponse.data.parent.forEach(
          ({ functionName, filePath, lineNumber, columnNumber }, idx) => {
            console.error(
              `${consoleTextColoringWrapper(
                "blue",
                `${idx + 1}.`
              )} ${functionName} at ${consoleTextColoringWrapper(
                "cyan",
                `${filePath}:${lineNumber}:${columnNumber}`
              )}`
            );
          }
        );
      }
  
      console.error(consoleBgColoringWrapper("red", "---+---END ERROR REPORT---+---"));
    }

    errorResponse(res, status, message, errorType, {
      parent,
      data: error,
    });
    return;
  } else {
    console.log(error);

    errorResponse(res, 500, "Something went wrong internally.", "Internal Server Error", {
      parent: "Unknown",
      data: error,
    });
  }
};

const getParentFunctions = (stack) => {
  const parentFunctions = [];

  for (let i = 1; i < stack.length; i++) {
    const line = stack[i];
    const match = line.match(
      /at (?<functionName>.+) \((?<filePath>.+):(?<lineNumber>\d+):(?<columnNumber>\d+)\)/
    );
    if (match) {
      const { functionName, filePath, lineNumber, columnNumber } = match.groups;
      let relativePath;

      if (filePath.includes("node_modules")) {
        relativePath = filePath.substring(filePath.indexOf("node_modules"));
      } else {
        relativePath = path.relative(serverRoot, filePath);
      }

      relativePath = relativePath.replace(/\\/g, "/");
      relativePath = relativePath.replace(/^file:\/+/, "");

      parentFunctions.push({
        functionName,
        filePath: relativePath,
        lineNumber,
        columnNumber,
      });
    }
  }
  return parentFunctions;
};

export default errorHandler;