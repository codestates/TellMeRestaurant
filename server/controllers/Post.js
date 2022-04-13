const { post } = require("../models");
const { isAuthorized } = require("./tokenFunction");

module.exports = {
  sendPost: (req, res) => {
    const accessTokendata = isAuthorized(req);
    const { title, contents, choice_1, choice_2, img_1, img_2, hashTags } =
      req.body;
    console.log(accessTokendata);
    console.log(title, contents, choice_1, choice_2, hashTags, img_1, img_2);
    if (!accessTokendata) {
      res.status(401).send("invalid");
    } else {
      if (
        !title ||
        !contents ||
        !choice_1 ||
        !choice_2 ||
        !img_1 ||
        !img_2 ||
        !hashTags
      ) {
        res
          .status(422)
          .json({ data: null, message: "insufficient parameters supplied" });
      } else {
        post
          .create({
            user_id: accessTokendata.id,
            title: title,
            contents: contents,
            imgInfo1: img_1,
            imgInfo2: img_2,
            option1: choice_1,
            option2: choice_2,
            option1_count: 0,
            option2_count: 0,
            tags: hashTags,
            created_at: new Date(),
            updated_at: new Date(),
          })
          .then((data) => {
            console.log("data:", data);
            res.status(201).json({
              message: "ok",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  },
};
