import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div id="nav-body">
      <span id="title">
        <img id="logo" src="" alt=""></img>
        <span id="name">
          <Link to="/" id="name1">
            aroundbestR
          </Link>
        </span>
      </span>
      <div className="menu">
        <Link to="/login" id="menu1">
          login
        </Link>
        <Link to="/mypage" id="menu2">
          mypage
        </Link>
      </div>
    </div>
  );
}

export default Nav;
//로그인은 모달창 띄우기
//마이페이지 링크로 구현
