import Constants from "../constants.js";
import { internalServerError } from "./ApiError.js";

const consoleTextColoringWrapperData = {
  blue: {
    header: "\x1b[34m",
    footer: "\x1b[0m",
  },
  magenta: {
    header: "\x1b[35m",
    footer: "\x1b[0m",
  },
  green: {
    header: "\x1b[32m",
    footer: "\x1b[0m",
  },
  yellow: {
    header: "\x1b[33m",
    footer: "\x1b[0m",
  },
  cyan: {
    header: "\x1b[36m",
    footer: "\x1b[0m",
  },
};

const consoleBgColoringWrapperData = {
  blue: {
    header: "\x1b[44m",
    footer: "\x1b[0m",
  },
  magenta: {
    header: "\x1b[45m",
    footer: "\x1b[0m",
  },
  green: {
    header: "\x1b[42m",
    footer: "\x1b[0m",
  },
  yellow: {
    header: "\x1b[43m",
    footer: "\x1b[0m",
  },
  cyan: {
    header: "\x1b[46m",
    footer: "\x1b[0m",
  },
  white: {
    header: "\x1b[47m",
    footer: "\x1b[0m",
  },
}

const consoleTextColoringWrapper = (color, text) => {
  return `${consoleTextColoringWrapperData[color].header} ${text} ${consoleTextColoringWrapperData[color].footer}`;
}

const consoleBgColoringWrapper = (color, text) => {
  return `${consoleBgColoringWrapperData[color].header} ${text} ${consoleBgColoringWrapperData[color].footer}`;
}

const infoLogger = (tag, message) => {
  if(!tag || !message) {
    throw new Error("Invalid arguments for infoLogger");
  }

  if(Constants.ENV === 'development') {
    console.log(`[${consoleBgColoringWrapper("cyan", tag)}]: ${consoleTextColoringWrapper("blue", message)}`);
  }

  return;
}

const responseLogger = (responseObject) => {
  const isResponseObject = (responseObject instanceof ApiResponse);
  if(!isResponseObject) {
    internalServerError("Response object is not an instance of ApiResponse", null);
  };

  const { success, message, data, status, errorType, error } = responseObject;

  if(Constants.ENV === 'development') {
    console.log(`${consoleTextColoringWrapper((success ? "green" : "red"), "------[ API RESPONSE ]------")}`);
    console.log(`SUCCESS: ${consoleTextColoringWrapper((success ? "green" : "red"), success)}`);
    console.log(`MESSAGE: ${consoleTextColoringWrapper("blue", message)}`);
    console.log(`DATA: ${consoleTextColoringWrapper("yellow", JSON.stringify(data, null, 2))}`);
    console.log(`STATUS: ${consoleTextColoringWrapper("magenta", status)}`);

    if(!success && errorType && error) {
      console.log(`ERROR TYPE: ${consoleTextColoringWrapper("blue", errorType)}`);
      console.log(`ERROR: ${consoleTextColoringWrapper("blue", error)}`);
    }

    console.log(`${consoleTextColoringWrapper((success ? "green" : "red"), "---+---[ API RESPONSE END ]---+---")}`);
  }
}

const requestLogger = (req) => {
  const {  method, url, hostname } = req;

  if(Constants.ENV === 'development') {
    console.log(`${consoleTextColoringWrapper("blue", "------[ API REQUEST ]------")}`);
    console.log(`${consoleBgColoringWrapper("white", "METHOD")}: ${consoleTextColoringWrapper("magenta", method)}`);
    console.log(`${consoleBgColoringWrapper("white", "URL")}: ${consoleTextColoringWrapper("green", url)}`);
    console.log(`${consoleBgColoringWrapper("white", "HOSTNAME")}: ${consoleTextColoringWrapper("blue", hostname)}`);
    console.log(`${consoleTextColoringWrapper("blue", "---+---[ API REQUEST END ]---+---")}`);
  }
}

export { infoLogger, responseLogger, requestLogger, consoleBgColoringWrapper, consoleTextColoringWrapper };