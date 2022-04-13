const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')


// 미들웨어 세팅
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['https://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', "PATCH", "DELETE"]
  })
);
app.use(cookieParser());

// 라우터 세팅
const controllers = require('./controllers');

app.get('/auth', controllers.auth);
app.post('/signup', controllers.signup);
app.post('/signin', controllers.signin);
app.post('/signout', controllers.signout);

// 서버실행
const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;
server = app.listen(HTTPS_PORT, () => console.log(`https server runnning ${HTTPS_PORT}`));

module.exports = server;