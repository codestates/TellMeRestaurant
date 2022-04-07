// const { users } = require('../../models');

module.exports = (req, res) => {
    if(!req.body.userId) {
        res.status(404).send("유저정보가 없음")
    }else {
        res.status(200).send("유저정보 있음")
    }
}