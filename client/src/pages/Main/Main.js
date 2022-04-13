import React from "react";
import { useState } from "react";
import styles from "./Main.module.css";

function Main() {
  return (
    <section className={styles.content}>
      <div className={styles.Main}>
        <div className={styles.title}>
          <img
            src="https://i.pinimg.com/564x/95/8d/6b/958d6bc2aa5b61521790f0648c2c2ad2.jpg"
            alt="이미지"
            className={styles.titleimage}
          ></img>
          <div className={styles.titledetail}>
            <h3 className={styles.titletitle}>스시효</h3>
            <div className={styles.titlehashtag}>#경기도 #성남시</div>
            <br />
            <div className={styles.title1}>
              만남의 장소이자 소개팅의 메카! 여전히 복작복작 사람들로 붐비는
              강남에 진짜 맛집은 어디 숨은걸까? 정말이지 보이는 많은 곳들 중
              진정한 맛집을 찾을 수 있는 혜안을 가지고 싶다. (설마 나만 모르는
              건 아니겠지..?)
            </div>
          </div>
        </div>
        <div className={styles.title}>
          <img
            src="https://i.pinimg.com/564x/95/8d/6b/958d6bc2aa5b61521790f0648c2c2ad2.jpg"
            alt="이미지"
            className={styles.titleimage}
          ></img>
          <div className={styles.titledetail}>
            <h3 className={styles.titletitle}>스시효</h3>
            <div className={styles.titlehashtag}>#경기도 #성남시</div>
            <br />
            <div>
              만남의 장소이자 소개팅의 메카! 여전히 복작복작 사람들로 붐비는
              강남에 진짜 맛집은 어디 숨은걸까? 정말이지 보이는 많은 곳들 중
              진정한 맛집을 찾을 수 있는 혜안을 가지고 싶다. (설마 나만 모르는
              건 아니겠지..?)
            </div>
          </div>
        </div>
        <div className={styles.title}>
          <img
            src="https://i.pinimg.com/564x/95/8d/6b/958d6bc2aa5b61521790f0648c2c2ad2.jpg"
            alt="이미지"
            className={styles.titleimage}
          ></img>
          <div className={styles.titledetail}>
            <h3 className={styles.titletitle}>스시효</h3>
            <div className={styles.titlehashtag}>#경기도 #성남시</div>
            <br />
            <div>
              만남의 장소이자 소개팅의 메카! 여전히 복작복작 사람들로 붐비는
              강남에 진짜 맛집은 어디 숨은걸까? 정말이지 보이는 많은 곳들 중
              진정한 맛집을 찾을 수 있는 혜안을 가지고 싶다. (설마 나만 모르는
              건 아니겠지..?)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Main;
