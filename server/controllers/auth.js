const { users } = require("../models");
const { isAuthorized } = require("./tokenFunction");

module.exports = {
  auth: (req, res) => {
    const accessTokendata = isAuthorized(req);
    if (!accessTokendata) {
      res.status(401).json({ data: null, message: "invalid accessToken" });
    }
    res
      .status(200)
      .json({ data: { userInfo: accessTokendata }, message: "ok" });
  },
};
