const { user } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = async(req, res) => {
  
  const userInfo = await user.findOne({
    where: { email: req.body.email, password: req.body.password },
  });
  
  if(!userInfo) {
    res.status(404).send('invalid user');
  } else {
    generateAccessToken(userInfo)
    sendAccessToken(res, generateAccessToken(userInfo))
  }
};