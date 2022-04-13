const { voter: voterModel, post: postModel } = require("../../models");
const voter = require("../../models/voter");
const { isAuthorized } = require("../tokenFunction");
module.exports = {
  isVote: async (req, res) => {
    //헤더값이 들어온다.
    const userInfo = isAuthorized(req);
    const { postId } = req.query;
    const user_id = userInfo.id;
    const result = await voterModel.findOne({
      where: {
        voting_id: postId,
        user_id,
      },
    });

    if (!result) {
      return res
        .status(200)
        .json({ message: "user did not vote", isVote: true });
    } else {
      return res.status(202).json({ message: "voted user", isVote: false });
    }
  },
  vote: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { postId: voting_id, option: options_check } = req.body;

    const user_id = userInfo.id;
    await voterModel.create({
      voting_id,
      user_id,
      options_check,
    });

    if (options_check === 1) {
      const result = await postModel.findOne({
        attributes: ["option1_count"],
        where: {
          id: voting_id,
        },
      });

      const { option1_count: count } = result.dataValues;

      console.log(count);
      const doUpdate = await postModel.update(
        { option1_count: count + 1 },
        {
          where: {
            id: voting_id,
          },
        }
      );
      if (!!doUpdate) res.status(201).json({ message: "ok" });
      if (!doUpdate) res.status(201).json({ message: "failed to vote" });
    } else if (options_check === 2) {
      const result = await postModel.findOne({
        attributes: ["option2_count"],
        where: {
          id: voting_id,
        },
      });

      const { option2_count: count } = result.dataValues;

      const doUpdate = await postModel.update(
        { option2_count: count + 1 },
        {
          where: {
            id: voting_id,
          },
        }
      );
      if (!!doUpdate) res.status(201).json({ message: "ok" });
      if (!doUpdate) res.status(201).json({ message: "failed to vote" });
    }
  },
  voteResult: async (req, res) => {
    const { postId } = req.body;

    const result = await postModel.findOne({
      attributes: ["option1_count", "option2_count"],
      where: {
        id: postId,
      },
    });

    const { option1_count, option2_count } = result.dataValues;

    res.status(200).json({
      data: {
        option1_count,
        option2_count,
      },
      message: "ok",
    });
  },
};
