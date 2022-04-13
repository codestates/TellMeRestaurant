import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Navbar from "./components/Navbar/Navbar";
import Mypage from "./pages/Mypage/Mypage";
import Main from "./pages/Main/Main";
import Signup from "./pages/Signup/Signup";
import PlusButton from "./components/ScrollButton/PlusButton";
import Writing from "./pages/writing/Writing";
import Footer from "./pages/Footer/Footer";
import axios from "axios";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [info, setInfo] = useState(null);
  const [isGoogle, setIsGoogle] = useState(false);
  const [listRender, setListRender] = useState(true);

  //로그인 성공 함수
  const handleResponseSuccess = (data) => {
    const { accessToken, message } = data;
    setAccessToken(accessToken);
    loginHandler();
    isAuthenticated(accessToken);
  };
  //로그인 성공시 get요청으로 다보이게
  const isAuthenticated = (accessToken) => {
    setAccessToken(accessToken);
    axios
      .get(
        "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/user/auth",
        {
          headers: {
            authorization: accessToken,
          },
          "Content-Type": "application/json",
        }
      )
      .then((result) => {
        const { id, user_id, nickname, password, phone_number } =
          result.data.data.userInfo;
        setInfo({
          id: id,
          userid: user_id,
          nickname: nickname,
          mobile: phone_number,
          password: password,
          password2: "",
        });
      });
  };
  //로그인 됐다는걸 true 증명
  const loginHandler = () => {
    setIsLogin(true);
  };
  //로그아웃 함수
  const onSignout = () => {
    axios.post("").then((result) => {
      setIsLogin(false);
      setInfo(null);
      setAccessToken(result.data.accessToken);
      browserHistory.push("/");
    });
    setIsLogin(false);
    setIsGoogle(false);
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          handleResponseSuccess={handleResponseSuccess}
          isLogin={isLogin}
          onSignout={onSignout}
        />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/mypage" exact>
            <Mypage isLogin={isLogin} info={info} />
          </Route>
          <Route path="/login" exact>
            <Signup />
          </Route>
          <Route path="/writing">
            <Writing
              isLogin={isLogin}
              setListRender={setListRender}
              accessToken={accessToken}
            />
          </Route>
        </Switch>
        <PlusButton />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
export const browserHistory = createBrowserHistory();
