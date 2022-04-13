require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET);
  },
  isAuthorized: (req) => {
    const authorization = req.headers.authorization; /**["cookie"];*/
    if (!authorization) {
      return null;
    }
    const token =
      authorization; /*.split(";")[0].split("=")[1]; //토큰 들어오는 것 보고 수정*/
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
