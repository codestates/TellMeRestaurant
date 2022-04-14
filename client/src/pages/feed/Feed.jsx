import React from "react";
import styles from "./Feed.module.css";

function Feed({ selectedFeed }) {
  const getToday = (date) => {
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.contentes}>
          <div className={styles.title}>{selectedFeed.title}</div>
          <div className={styles.created_at}>
            {selectedFeed.created_at} , by 익명
          </div>
          <img src={selectedFeed.imgInfo1} className={styles.titleimage} />
          <div className={styles.hashtags}>
            {selectedFeed.tags.map((el) => (
              <div className={styles.hashtag}>{el}</div>
            ))}
          </div>
          {/* <div className={styles.content1}>
            #경기 성남시 분당구 대왕판교로606번길 45 (삼평동, 판교역
            푸르지오시티)
          </div>  예시!*/}
          {/* <div className={styles.content1}>
            #{selectedFeed.address}
          </div> 프롭스로 받아오면 이거 주석해제*/}
          <div className={styles.content}>{selectedFeed.contents}</div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
