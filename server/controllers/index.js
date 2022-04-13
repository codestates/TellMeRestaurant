module.exports = {
  // 모듈로 값을 가져옴
  // index파일에 전달됨
    auth: require('./users/auth'),
    signup: require('./users/signup'),
    signin: require('./users/signin'),
    signout: require('./users/signout')
  };