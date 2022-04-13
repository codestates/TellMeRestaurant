require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    // ACCESS TOKEN sign
    const accessToken = sign({data}, process.env.ACCESS_SECRET, { expiresIn: '5h' })
    return accessToken;
  },
  sendAccessToken: (res, accessToken) => {
    // 쿠키에 담아서 토큰전달
    // console.log(accessToken)
    res.cookie("jwt",accessToken);
    res.status(200).json({ "accessToken": accessToken , "message": "ok" });
  },
  isAuthorized: (req) => {
    // users/auth.js
    // 토큰 검증
    const cookie = req.cookies;
    console.log(cookie.jwt)
    if(!cookie.jwt) {
      return '';
    }
    return verify(cookie.jwt, process.env.ACCESS_SECRET);
  }
};
