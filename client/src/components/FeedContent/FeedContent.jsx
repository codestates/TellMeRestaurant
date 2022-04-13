import React from "react";
import styles from "./FeedContent.module.css";

function FeedContent({ feed }) {
  return (
    <div className={styles.title}>
      <img src={feed.imgInfo1} alt="이미지" className={styles.titleimage}></img>
      <div className={styles.titledetail}>
        <h3 className={styles.titletitle}>{feed.title}</h3>
        <div className={styles.titlehashtag}>
          {feed.tags.map((el) => (
            <span className={styles.hashtag}>{el}</span>
          ))}
        </div>
        <br />
        <div className={styles.title1}>{feed.content}</div>
      </div>
    </div>
  );
}

export default FeedContent;
