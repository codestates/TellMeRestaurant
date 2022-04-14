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

          <div className={styles.content}>{selectedFeed.contents}</div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
