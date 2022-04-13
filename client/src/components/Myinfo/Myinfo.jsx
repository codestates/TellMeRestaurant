import styles from "./Myinfo.module.css";
import React, { useState } from "react";
import NeedLoginPage from "../NeedLoginPage/NeedLoginPage";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const Myinfo = ({ info, accessToken, isLogin }) => {
  const history = useHistory();

  const handleClickModify = () => {
    //modify method
    history.push("/modifyinfo");
  };

  return (
    <>
      {isLogin ? (
        <section>
          <div className={styles.infobox}>
            <div className={styles.imgbox}>
              <span className={styles.imgborder}>
                <img
                  src="../../../images/face3.png"
                  className={styles.faceimg}
                ></img>
              </span>
            </div>
            <div className={styles.textbox}>
              <div className={styles.ulbox}>
                <span className={styles.list}>
                  닉네임 :
                  <input
                    className={styles.input}
                    value={`유저의 닉네임`}
                    /* 나중에 info.userId 로 바꿔야함 지금오류남 */
                    readOnly
                  ></input>
                </span>
                <span className={styles.list}>
                  모바일 :
                  <input
                    className={styles.input}
                    value={`유저 데이터 번호`}
                    readOnly
                  ></input>
                </span>
              </div>
            </div>
            <button className={styles.btn} onClick={handleClickModify}>
              수정하기
            </button>
          </div>
        </section>
      ) : (
        <NeedLoginPage />
      )}
    </>
  );
};

export default Myinfo;
