const { changeProfile } = require("../controllers/ProfileChange");
const { Router } = require("express");
const router = Router();
const { users } = require("../models");
const { getMyPost } = require("../controllers/GetMyPost");
const { generateAccessToken } = require("./tokenFunction");
const { getMyInfo } = require("./GetMyInfo");
const { auth } = require("../controllers/auth");
const { updateMyPost } = require("./UpdateMyPost");
const { sendPost } = require("../controllers/Post");
const { deleteMyPost } = require("./DestroyMyPost");
const { getAllPost } = require("./MainPage");
const { isVote, vote, voteResult } = require("./Vote");
const { getToken, getUserInfo } = require("../controllers/GoogleOAuth");

//아이디 닉네임 모바일 비밀번호

router.post("/sign-up", (req, res) => {
  const { userId, password, userName, mobile, signUpType } = req.body;
  console.log(userId, password, userName, mobile, signUpType);

  if (!userId || !password || !userName || !mobile) {
    return res.status(422).send("insufficient parameters supplied");
  }
  const passwordToken = generateAccessToken(password);

  users
    .findOrCreate({
      where: {
        user_id: userId,
      },
      defaults: {
        password: passwordToken,
        nickname: userName,
        phone_number: mobile,
        sign_up_type: 2,
        account_type: "client",
        created_at: new Date(),
        updated_at: new Date(),
      },
    })
    .then(([result, created]) => {
      if (!created) {
        return res.status(409).send("id exists");
      }
      const data = result.dataValues;

      return res.status(201).json({ message: "ok" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/sign-in", async (req, res) => {
  const { userId, password } = req.body;

  const passwordToken = generateAccessToken(password);

  const result = await users.findOne({
    where: {
      user_id: userId,
      password: passwordToken,
    },
  });
  if (!result) {
    return res.status(404).send("invalid user");
  }
  const userInfo = result.dataValues;
  console.log(userInfo);
  delete userInfo.password;

  const accessToken = generateAccessToken(userInfo);

  return (
    res
      .status(200)
      .json({
        accessToken,
        message: "ok",
      })
  );
});

router.post("/receive/token", getToken);
router.get("/receive/userinfo?", getUserInfo);

router.post("/sign-out", (req, res) => {
  res.status(205).json({ message: "successfully signed out!" });
});

router.post(
  "/user/profile/:id",

  changeProfile
);

router.post("/posting", sendPost);
router.get("/get-all-post", getAllPost);

router.get("/vote/isVote?", isVote);
router.post("/vote", vote);
router.post("/vote/vote-result", voteResult);

router.delete("/user/posting-list/:postid", deleteMyPost);

router.get("/", (req, res) => {
  res.send("hello world");
});

router.get("/user/posting-list/:id", getMyPost);

router.get("/user/auth", auth);

router.get("/user/:id", getMyInfo);

router.post("/user/posting-list/:postid", updateMyPost);

module.exports = router;
