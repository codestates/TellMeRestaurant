import "./App.css";
import React, { useEffect, useState } from "react";
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
import MainFeed from "./pages/Mainpost/MainFeed";
import Feed from "./pages/feed/Feed";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [info, setInfo] = useState(null);
  const [isGoogle, setIsGoogle] = useState(false);

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
        "http://ec2-13-125-219-156.ap-northeast-2.compute.amazonaws.com/user/auth",
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

  /*********************메인 페이지 컨트롤 부분***************************/
  const [feeds, setFeeds] = useState([]); //전체 피드리스트
  const [sortValue, setSortValue] = useState("최신순");
  const [listRender, setListRender] = useState(true);
  const [selectedFeed, setSelectedFeed] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          "http://ec2-13-125-219-156.ap-northeast-2.compute.amazonaws.com/get-all-post"
        )
        .then((res) => {
          if (sortValue === "최신순") {
            let result = res.data.data.sort((a, b) => {
              return new Date(b.created_at) - new Date(a.created_at);
            }); //오름차순 정렬
            setFeeds(
              result.map((el) => {
                return { ...el, tags: JSON.parse(el.tags) };
              })
            ); //tag를 합침
          } else if (sortValue === "인기순") {
            let result = res.data.data.sort((a, b) => {
              return (
                b.option1_count +
                b.option2_count -
                (a.option1_count + a.option2_count)
              );
            });
            setFeeds(
              result.map((el) => {
                return { ...el, tags: JSON.parse(el.tags) };
              })
            );
          }
        });
    }, 300);
  }, [listRender]);

  const select = (el) => {
    //썸네일 클릭 시
    setSelectedFeed(el);
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          setListRender={() => setListRender(!listRender)}
          handleResponseSuccess={handleResponseSuccess}
          isLogin={isLogin}
          onSignout={onSignout}
        />
        <Switch>
          <Route path="/" exact>
            <MainFeed feeds={feeds} handleClick={select} />
          </Route>
          <Route path="/mypage" exact>
            <Mypage isLogin={isLogin} info={info} />
          </Route>
          <Route path="/login" exact>
            <Signup />
          </Route>
          {selectedFeed ? (
            <Route path="/feed">
              <Feed selectedFeed={selectedFeed} />
            </Route>
          ) : null}

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
