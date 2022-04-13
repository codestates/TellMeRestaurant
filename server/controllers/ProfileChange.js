const { users } = require("../models");
const { isAuthorized } = require("./tokenFunction");
const { generateAccessToken } = require("./tokenFunction");

module.exports = {
  // [POST] /user/profile/:id
  changeProfile: async (req, res) => {
    const user_id = req.params.id;

    const { userName, mobile, password } = req.body;
    console.log(req.body);
    const accessTokendata = isAuthorized(req);

    if (!accessTokendata) {
      res.status(401).json({ message: "invalid access token" });
    } else {
      // password 변경 시
      if (password.length !== 0) {
        const newPasswordToken = generateAccessToken(password);

        const isUpdate = await users.update(
          {
            nickname: userName,
            phone_number: mobile,
            password: newPasswordToken,
          },
          {
            where: {
              id: accessTokendata.id,
            },
          }
        );

        if (isUpdate) {
          const result = await users.findOne({
            where: {
              id: user_id,
            },
          });

          const userData = result.dataValues;
          delete userData.password;
          const newAccessToken = generateAccessToken(userData);

          res
            .status(200)
            .json({ data: newAccessToken, message: "profile changed" });
        } else {
          res.status(404).json({ message: "user not exists" });
        }
      }
      // password 변경 없을 시
      else {
        const isUpdate = await users.update(
          {
            nickname: userName,
            phone_number: mobile,
          },
          {
            where: {
              id: accessTokendata.id,
            },
          }
        );

        if (isUpdate) {
          const result = await users.findOne({
            where: {
              id: user_id,
            },
          });
          console.log(result);
          const userData = result.dataValues;
          delete userData.password;
          const newAccessToken = generateAccessToken(userData);

          res
            .status(200)
            .json({ data: newAccessToken, message: "profile changed" });
        } else {
          res.status(404).json({ message: "user not exists" });
        }
      }
    }
  },
};
