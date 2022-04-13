const { user } = require('../../models');
const { generateAccessToken } = require('../tokenFunctions');

module.exports = (req, res) => {
  // console.log(req.body)
  if(!req.body.username || !req.body.email || !req.body.password || !req.body.mobile) {
    res.status(422).send('insufficient parameters supplied')
  }
  user.findOrCreate({
    where : {email : req.body.email},
    defaults : {
      email : req.body.email, username : req.body.username,
    password : req.body.password, mobile : req.body.mobile
    }
  })
  .then(([result, created]) => {
    if(created) { // 조회해서 없다면 생성했으므로 true, 있다면 생성하지 않았으니까 false를 반환한다.
      res.cookie("jwt",generateAccessToken(result))
      res.status(201).send({ message: 'ok' })
    } else {
      res.status(409).send('email exists')
    }
  })
  
  /**
   * client에서 회원가입 요청을 받아오는데, 만약 username, email, password, mobile 하나라도 넘어오지 않았다면
   * 상태메세지 422를 보내고 'insufficient parameters supplied' 메세지를 보낸다.
   * user 모델에서 email column이 존재한다면, 데이터베이스에서 email column을 찾고 있다면 그냥 그 값을 반환하고,
   * 없다면 defaults로 새로 column과 값을 생성해준다.
   * 이 과정은 client에서 회원가입을 할때 입력값을 요청해서 조회했더니 있다면, email exists를 반환해주고,
   * 없다면 쿠키에 토큰값을 실어서 보내주고, ok 매세지를 보낸다.
   * 
   */
  
};