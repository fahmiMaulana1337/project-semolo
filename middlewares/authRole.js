const { decodeToken } = require("../helpers/helper");

const verifyRole = async (req, res, next) => {
  try {
    let access_token = req.headers;
    const decoded = decodeToken(access_token.access_token);
    console.log("DECODE", decoded.role);
    if (decoded.role != "admin") {
      return res.status(403).send({
        success: false,
        message: "Access denied",
      });
    }
    next();
  } catch (err) {
    return res.status(403).send({
      success: false,
      message: "Access denied",
    });
  }
};

module.exports = {
  verifyRole,
  //   authorization,
};
