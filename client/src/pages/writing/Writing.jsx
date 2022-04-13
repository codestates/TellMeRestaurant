import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Writing.module.css";
import axios from "axios";
import AWS from "aws-sdk";

axios.defaults.withCredentials = true;

function Writing({ isLogin, setListRender, accessToken }) {
  const [title, setTitle] = useState("");
  const [firstImg, setFirstImg] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();

  const handleBack = () => {
    history.push("/");
  };

  const handletitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };

  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:a17da5be-96ef-4046-aaa8-62455cef2362", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const firstImgHandle = (event) => {
    //input 태그를 통한 선택한 파일 객체 ([0]에 저장됌)
    const imageFile = event.target.files[0];

    if (!imageFile) {
      return setFirstImg(null);
    }

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "pickmeupimagestorage", //업로드할 버킷명
        Key: imageFile.name, //업로드할 파일명
        Body: imageFile, //업로드할 파일 객체
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        setFirstImg(data.Location);
        console.log(data.Location);
      },
      function (err) {
        console.log(err);
      }
    );
  };

  const createFeedHandle = () => {
    // 피드테이블에 레코드 생성하는 axios POST 요청(지영)
    // 해당 피드 페이지 or 홈화면으로 Redirect 필요

    if (!title || !firstImg || !content) {
      setErrorMessage("항목을 모두 입력해주세요! 😊️");
    } else {
      console.log("*********************", accessToken);
      axios.post(
        "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/posting",
        {
          title: title,
          img_1: firstImg,
          contents: content,
          //배열이니까 JSON?
        },
        {
          headers: {
            authorization: accessToken,
          },
          "Content-Type": "application/json",
        }
      );
      setListRender();
      history.push("/");
    }
  };

  if (!isLogin) {
    return (
      <div className={styles.main}>
        <div className={styles.notLogin}>로그인이 필요한 서비스 입니다.</div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.contentes}>
          <div className={styles.title}>제목</div>
          <div>
            <input
              className={styles.contente1}
              type="text"
              value={title}
              onChange={handletitle}
            ></input>
          </div>
          <div className={styles.list}>사진 업로드</div>
          <div className={styles.list}>
            <input
              type="file"
              className={styles.imgInput}
              accept="image/*"
              onChange={firstImgHandle}
            ></input>

            {/* <button className={styles.fileBtn} onChange="">
              <i class="fas fa-solid fa-plus"></i>
            </button> */}
          </div>
          <div className={styles.list}>내용</div>
          <textarea
            className={styles.contente2}
            value={content}
            onChange={handleContent}
          ></textarea>
          <div className={styles.list}>카테고리</div>
          <div className={styles.tagBtn}>
            <button className={styles.tagBtns}>서울특별시</button>
            <button className={styles.tagBtns}>경기도</button>
            <button className={styles.tagBtns}>충청도</button>
            <button className={styles.tagBtns}>강원도</button>
          </div>
          <div className={styles.selectBtn}>
            <button className={styles.selectBtns} onClick={createFeedHandle}>
              등록
            </button>

            <button className={styles.selectBtns} onClick={handleBack}>
              취소
            </button>
          </div>
          <br />
          <div className={styles.error}>{errorMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default Writing;
