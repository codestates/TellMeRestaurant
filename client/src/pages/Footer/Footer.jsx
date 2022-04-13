import React from "react";
import styles from "./Footer.module.css";

const Footer = (props) => {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.contentbox}>
          <div className={styles.teamname}>
            Team SJG
            <ul className={styles.nameList}>
              <li>
                <a
                  target="_blank"
                  href="https://github.com/LEEJAESHIN"
                  className={styles.member}
                  alt="주소"
                >
                  Front-end 이재신
                </a>
              </li>
              <li>
                <a target="_blank" href="" className={styles.member}>
                  Full-stack 이규동
                </a>
              </li>
              <li>
                <a target="_blank" href="" className={styles.member}>
                  Back-end 황시우
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.rights}>
            Copyright &#169; 2022 Team SJG All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
