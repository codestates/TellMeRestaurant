require('dotenv').config();
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const controllers = require('./controllers');


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
app.get('/signup',controllers.signup)

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;
server = app.listen(HTTPS_PORT,console.log(`서버 열림 ${HTTPS_PORT}`))
module.exports=server