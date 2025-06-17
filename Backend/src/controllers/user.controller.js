import { sendMsgResponse } from "../utils/ApiError.js";
import { sendObjectResponse } from "../utils/ApiResponse.js";
import { StringError } from "../errors/string.error.js";
import httpStatusCodes from "http-status-codes";
import userService from "../services/user.service.js";

const registerAdminUser = async (req, res) => {
  try {
    const user = await userService.registerAdminUser(req);
    return sendObjectResponse({
      res,
      result: user,
      message: "Admin user registered successfully",
      status: 1,
      statusCode: httpStatusCodes.OK,
    });
  } catch (e) {
    console.log({ e });
    if (e instanceof StringError) {
      return sendMsgResponse({
        res,
        message: e.message,
        status: 0,
        statusCode: httpStatusCodes.BAD_REQUEST,
      });
    }
    return sendMsgResponse({
      res,
      message: "Something went wrong!",
      status: 0,
      statusCode: httpStatusCodes.BAD_REQUEST,
    });
  }
};

const loginAdminUser = async (req, res) => {
  try {
    const user = await userService.loginAdminUser(req);
    return sendObjectResponse({
      res,
      result: user,
      message: "Admin user logged in successfully",
      status: 1,
      statusCode: httpStatusCodes.OK,
    });
  } catch (e) {
    console.log({ e });
    if (e instanceof StringError) {
      return sendMsgResponse({
        res,
        message: e.message,
        status: 0,
        statusCode: httpStatusCodes.BAD_REQUEST,
      });
    }
    return sendMsgResponse({
      res,
      message: "Something went wrong!",
      status: 0,
      statusCode: httpStatusCodes.BAD_REQUEST,
    });
  }
};

export { registerAdminUser, loginAdminUser };
