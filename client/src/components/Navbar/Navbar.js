import React, { useState } from "react";
import { Link } from "react-router-dom";
import Signup from "../../pages/Signup/Signup";
import Signin from "../Signin/Signin";
import styles from "./Navbar.module.css";

function Navbar({ handleResponseSuccess, isLogin, onSignout }) {
  const [isSigninClicked, setIsSigninClicked] = useState(false);
  const [BtnStatus, setBtnStatus] = useState(false);

  const clickSigninBtn = () => {
    setIsSigninClicked(!isSigninClicked);
  };

  const clickCloseBtn = () => {
    setIsSigninClicked(false);
  };

  return (
    <div>
      <div className={styles.navbody}>
        <span className={styles.title}>
          <span className={styles.name}>
            <Link to="/" className={styles.name1}>
              aroundbestR
            </Link>
          </span>
        </span>
        <div className={styles.menu}>
          {isSigninClicked ? (
            <Signin
              clickSigninBtn={clickSigninBtn}
              clickCloseBtn={clickCloseBtn}
              setIsSigninClicked={setIsSigninClicked}
              handleResponseSuccess={handleResponseSuccess}
            />
          ) : null}
          {isLogin ? (
            <button className={styles.menu1} onClick={onSignout}>
              Logout
            </button>
          ) : (
            <button className={styles.menu1} onClick={clickSigninBtn}>
              Sign In
            </button>
          )}
          <Link to="/mypage" className={styles.menu2}>
            mypage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
//로그인은 모달창 띄우기
//마이페이지 링크로 구현
