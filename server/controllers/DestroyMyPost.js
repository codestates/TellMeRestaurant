const { isAuthorized } = require("./tokenFunction");
const { post } = require("../models");
const { voter } = require("../models");

module.exports = {
  deleteMyPost: (req, res) => {
    const post_id = req.params.postid;
    const accessTokendata = isAuthorized(req);

    // voter 테이블에서 voting_id(post pk 참조) 먼저 삭제하고
    // post 테이블에서 게시글 삭제
    if (!accessTokendata) {
      return res.status(401).json({ message: "invalid access token" });
    } else {
      voter
        .destroy({
          where: {
            voting_id: post_id,
          },
        })
        .then((data) => {
          post.destroy({
            where: {
              id: post_id,
            },
          });
        })
        .then((data) => {
          return res.status(200).json({ message: "successfully deleted" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
