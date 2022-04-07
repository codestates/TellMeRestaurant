import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div id="nav-body">
      <span>
        <img id="logo" src="" alt=""></img>
        <span id="name">aroundbestR</span>
      </span>
      <div id="login">login</div>
      <Link to="/mypage">
        <div id="mypage">mypage</div>
      </Link>
    </div>
  );
}

export default Nav;
//로그인은 모달창 띄우기
//마이페이지 링크로 구현
