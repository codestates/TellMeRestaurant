import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Signup from "../../pages/Signup/Signup";
import styles from "./Signin.module.css";
import Google from "./Google";

function Signin({ clickCloseBtn, setIsSigninClicked, handleResponseSuccess }) {
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
  });

  const history = useHistory();
  const { userId, password } = loginInfo;

  const clickSignUpBtn = () => {
    setIsSignUpClicked(!isSignUpClicked);
  };
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = () => {
    if (!userId || !password) {
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요");
    } else {
      setErrorMessage("");
      axios
        .post(
          "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/sign-in",
          loginInfo
        )
        .then((result) => {
          if (result.data.message === "ok") {
            window.localStorage.setItem(
              "accessToken",
              JSON.stringify(result.data.accessToken)
              // result.data.accessToken
            );
            handleResponseSuccess(result.data); //result.data.message="ok"!!
            clickCloseBtn(); //::제대로 받아왔을경우 사인인창 없애기
            history.push("/");
          }
        })
        .catch((err) => {
          setErrorMessage("가입하지 않은 사용자입니다.");
        });
    }
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
                onChange={handleInputValue("userId")}
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
            {errorMessage ? (
              <div className={styles.error}>{errorMessage}</div>
            ) : null}
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
                <Google />
              </button>
            </div>
            <br />
            <div>
              <button
                className={styles.btnsignup}
                type="submit"
                onClick={handleLogin}
              >
                로그인
              </button>
            </div>
            <br />
            <div>
              <button className={styles.exit} onClick={clickCloseBtn}>
                나가기
              </button>
            </div>
            {/* <div className="alert-box">{errorMessage}</div> */}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Signin;

/* 로그인 어떻게 하나 ?
내 아이디와 비밀번호를 입력하고 axios에 정보와
같이 요청을 한다. 이에 성공하면 
accessToken => 상태로 내 토큰을 넣어줌
loginhandler => 로그인 true로 됐다는걸 증명
isAuthenticated => get 요청을 통해 내정보들을 상태 변경 하고 뿌려줌 */
