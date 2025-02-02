const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization").replace("Bearer ", "") ||
      req.cookies.token ||
      req.body.token ;
      
    if (!token) {
      return res.status(401).json({
        message: "Token not found",
        success: false,
      });
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decode:", decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        error:err.message,
        message: "Token is invalid",err
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
};
