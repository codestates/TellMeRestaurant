import React, { useState } from "react";
import Signup from "../../pages/Signup/Signup";
import styles from "./Signin.module.css";

function Signin({ clickCloseBtn, setIsSigninClicked }) {
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
  });

  const clickSignUpBtn = () => {
    setIsSignUpClicked(!isSignUpClicked);
  };
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  return (
    <div>
      <section className={styles.backdrop}>
        {isSignUpClicked ? (
          <Signup
            isSignUpClicked={isSignUpClicked}
            clickCloseBtn={clickCloseBtn}
            setIsSignUpClicked={setIsSignUpClicked}
          />
        ) : null}
        <div className={styles.popup}>
          <div className={styles.popuphead}></div>
          <h1 className={styles.signin}>Sign In</h1>

          <br />
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="text"
                className={styles.inputText}
                onChange={handleInputValue("email")}
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div>
              <input
                type="password"
                className={styles.inputText}
                onChange={handleInputValue("password")}
                placeholder="비밀번호 를 입력하세요"
              />
            </div>
            {errorMessage ? <li className="error">{errorMessage}</li> : null}
            <br />
            <div>
              <button
                className={styles.btnsignup}
                type="submit"
                onClick={clickSignUpBtn}
              >
                회원가입
              </button>
            </div>
            <br />
            <div>
              <button className={styles.btnsignup} type="submit" onClick="">
                Google
              </button>
            </div>
            <br />
            <div>
              <button className={styles.btnsignup} type="submit" onClick="">
                로그인
              </button>
            </div>
            <br />
            <div>
              <button className={styles.exit} onClick={clickCloseBtn}>
                나가기
              </button>
            </div>
            <div className="alert-box">{errorMessage}</div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Signin;
