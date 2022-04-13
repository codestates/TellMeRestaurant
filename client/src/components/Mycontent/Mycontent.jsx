import styles from "./Mycontent.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NeedLoginPage from "../NeedLoginPage/NeedLoginPage";

const Mycontent = ({
  handleContent,
  feeds,
  accessToken,
  handleFeeds,
  setListRender,
  isLogin,
}) => {
  //feeds로 마이리스트가 들어옴.

  const [isPicked, setIsPicked] = useState(null);
  const [moreOpt, isMoreOpt] = useState(false);

  const handleOptions = (el) => {
    setIsPicked(el);
    isMoreOpt(!moreOpt);
  };

  const deleteHandle = (el) => {
    // 피드테이블에서 레코드 삭제하는 axios DELETE 요청(지영)
    // 삭제 후 feeds 상태가 자동으로 변화되어 myfeeds 상태값도 바로 변화되는지 확인해봐야 함.
    // 삭제 후 myContent 컴포넌트로 redirect 필요.
    // el.id를 payload에 보내야 함(삭제할 피드의 피드아이디)

    axios
      .delete(
        `http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/user/posting-list/${el.id}`,
        {
          headers: {
            authorization: accessToken,
          },
          "Content-Type": "application/json",
        }
      )
      .then((res) => console.log("**************", res));

    setListRender();
  };

  if (isLogin) {
    return (
      <ul className={styles.feedList}>
        {feeds.map((el) => {
          if (JSON.stringify(el) === JSON.stringify(isPicked) && moreOpt) {
            //상태 두 개로 관리 안 해도 될 것 같음. 피드 id로 찾아내면 됌. 추후 디벨롭 예정
            return (
              <li className={styles.container}>
                <div className={styles.feed}>
                  <div className={styles.img}>
                    <Link to="/feed">
                      <img
                        className={styles.image}
                        src={el.imgInfo1}
                        onClick={() => handleFeeds(el)}
                        alt="option1"
                      />
                      <img
                        className={styles.image}
                        src={el.imgInfo2}
                        onClick={() => handleFeeds(el)}
                        alt="option2"
                      />
                    </Link>
                  </div>
                  <div className={styles.titleAndBtn}>
                    <span className={styles.title}>{el.title}</span>
                    <i
                      className="fas fa-ellipsis-h"
                      onClick={() => handleOptions(el)}
                    >
                      <ul className={styles.more}>
                        <Link to="/update">
                          <li
                            className={styles.moreOpt}
                            onClick={() => handleContent(el)}
                          >
                            수정
                          </li>
                        </Link>
                        <Link to="/">
                          <li
                            className={styles.moreOpt}
                            onClick={() => deleteHandle(el)}
                          >
                            삭제
                          </li>
                        </Link>
                      </ul>
                    </i>
                  </div>
                  <div className={styles.categories}>
                    {el.tags.map((el) => (
                      <span className={styles.hashtag}>{el}</span>
                    ))}
                  </div>
                  <span className={styles.voteText}>
                    {el.option1_count + el.option2_count}명이 투표했어요
                  </span>
                </div>
              </li>
            );
          } else {
            return (
              <li className={styles.container}>
                <div className={styles.feed}>
                  <div className={styles.img}>
                    <Link to="/feed">
                      <img
                        className={styles.image}
                        src={el.imgInfo1}
                        onClick={() => handleFeeds(el)}
                        alt="option1"
                      />
                      <img
                        className={styles.image}
                        src={el.imgInfo2}
                        onClick={() => handleFeeds(el)}
                        alt="option2"
                      />
                    </Link>
                  </div>
                  <div className={styles.titleAndBtn}>
                    <span className={styles.title}>{el.title}</span>
                    <i
                      className="fas fa-ellipsis-h"
                      onClick={() => handleOptions(el)}
                    ></i>
                  </div>
                  <div className={styles.categories}>
                    {el.tags.map((el) => (
                      <span className={styles.hashtag}>{el}</span>
                    ))}
                  </div>
                  <span className={styles.voteText}>
                    {el.option1_count + el.option2_count}명이 투표했어요
                  </span>
                </div>
              </li>
            );
          }
        })}
      </ul>
    );
  } else {
    return <NeedLoginPage />;
  }
};

export default Mycontent;

//새로고침 했을때 myinfo로 자동이동하는부분 막기
