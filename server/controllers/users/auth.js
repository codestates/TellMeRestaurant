const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {

  const accessTokenData = isAuthorized(req);
  // 토큰검증
  
  if(accessTokenData) {
    res.status(200).send({data : {userInfo : accessTokenData}})
  } else {
    res.status(401).send({data: null, message: 'not authorized' });
  }
};
