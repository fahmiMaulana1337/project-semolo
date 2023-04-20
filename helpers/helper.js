const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
module.exports = {
  hash: (password) => {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  },
  compare: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },
  encodeToken: (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY);
  },
  decodeToken: (token) => {
    return jwt.verify(token, JWT_SECRET_KEY);
  },
  formatType: (image) => {
    const fileType = image.mimetype;

    if (
      fileType !== "image/jpeg" &&
      fileType !== "image/jpg" &&
      fileType !== "image/png"
    ) {
      return "Invalid file type, only JPEG, JPG, and PNG is allowed!";
    }
  },
  formatSize: (image) => {
    const maxSizeImage = 2 * 1024 * 1024;
    const fileSize = image.size;
    if (fileSize > maxSizeImage) {
      return "File size image maximum 2MB";
    }
  },
};
