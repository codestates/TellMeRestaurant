import React from "react";
import styles from "./NeedLoginPage.module.css";

const NeedLoginPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.text}>로그인이 필요합니다.</div>
    </section>
  );
};

export default NeedLoginPage;
