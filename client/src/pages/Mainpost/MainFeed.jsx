import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainFeed.module.css";
import FeedContent from "../../components/FeedContent/FeedContent";

function MainFeed({ feeds, handleClick }) {
  return (
    <section>
      <div className={styles.content}>
        <div className={styles.Main}>
          {feeds.map((el) => (
            <FeedContent feed={el} handleClick={handleClick} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MainFeed;
