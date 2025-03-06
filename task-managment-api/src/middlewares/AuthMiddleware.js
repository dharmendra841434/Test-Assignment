import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyUserToken = async (req, res, next) => {
  const JWTSECRET = process.env.JWTSECRET;
  // console.log("AuthMiddleware => verifyUserToken");
  let usertoken = req.headers.authorization;

  try {
    if (!usertoken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    let tokens = usertoken.split(" ");
    if (tokens.length !== 2 || tokens[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token format",
      });
    }

    let token = tokens[1];
    let payload = jwt.verify(token, JWTSECRET);

    let user = await User.findById(payload._id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User does not exist" });
    }

    console.log(`User with ID ${user._id} authenticated.`);
    req.body.userId = user._id;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    let errorMessage = "Unauthorized: Invalid token";

    if (error.name === "TokenExpiredError") {
      errorMessage = "Unauthorized: Token has expired";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Unauthorized: Invalid token signature";
    }

    return res.status(401).json({ success: false, message: errorMessage });
  }
};

export { verifyUserToken };
