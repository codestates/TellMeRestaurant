import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./FeedContent.module.css";

function FeedContent({ feed, handleClick }) {
  return (
    <div className={styles.title}>
      <Link to="/feed">
        <img
          src={feed.imgInfo1}
          alt="이미지"
          className={styles.titleimage}
          onClick={() => handleClick(feed)}
        ></img>
      </Link>

      <div className={styles.titledetail}>
        <h3 className={styles.titletitle}>{feed.title}</h3>

        <div className={styles.titlehashtag}>
          {/* {feed.tags.map((el) => (
            <span className={styles.hashtag}>{el}</span>
          ))} */}
          <span className={styles.hashtag}>{feed.tags}</span>
        </div>

        <div className={styles.title1}>{feed.contents}</div>
      </div>
    </div>
  );
}

export default FeedContent;
