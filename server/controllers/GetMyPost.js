const { post } = require("../models");
const { isAuthorized } = require("../controllers/tokenFunction");

module.exports = {
  getMyPost: (req, res) => {
    const accessTokendata = isAuthorized(req);
    const user_id = req.params.id;

    if (!accessTokendata) {
      res.status(401).send({ data: null, message: "invalid access token" });
    } else {
      post
        .findAll({
          where: {
            user_id: user_id,
          },
        })
        .then((postList) => {
          if (!postList) {
            return res
              .status(404)
              .send({ data: null, message: "posts not exist" });
          } else {
            console.log("postList", postList);
            return res.status(200).send({ data: postList, message: "ok" });
          }
        });
    }
  },
};
