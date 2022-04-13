const { post } = require("../models");
const { isAuthorized } = require("./tokenFunction");

module.exports = {
  updateMyPost: (req, res) => {
    const accessTokendata = isAuthorized(req);
    const post_id = req.params.postid;
    const { title, contents, img_1, img_2, hashTags } = req.body;

    if (!accessTokendata) {
      res.status(401).json({ data: null, message: "invalid access token" });
    }
    if (!title && !contents && !img_1 && !img_2 && !hashTags) {
      res.status(422).json({ message: "insufficient parameters supplied" });
    } else {
      post
        .update(
          {
            title: title,
            contents: contents,
            imgInfo1: img_1,
            imgInfo2: img_2,
            tags: hashTags,
            updated_at: new Date(),
          },
          {
            where: {
              id: post_id,
            },
          }
        )
        .then((data) => {
          console.log("data:", data);
          if (!data) {
            res.status(404).json({
              data: null,
              message: "post not exists",
            });
          } else {
            res.status(200).json({
              data: data,
              message: "ok",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
