import React from "react";
import styles from "./style.less";


export default function (){
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.column}>
        <img
          src="https://img.freepik.com/free-vector/wheat-beer-banner-with-woodcut-style-hops-barrel-elements-3d-style-beige-tone_317810-1689.jpg?w=900"
          alt="adding image"
          className={styles.image}
        />

      </div>
      <div className={styles.tinyBanners}>
        <div className={styles.splitColumn}>
          <img
            src="https://img.freepik.com/free-vector/flat-design-international-beer-day-badges-collection_23-2148595623.jpg?t=st=1656236654~exp=1656237254~hmac=a20c8ffca7b5665882c9802fa790004b5a3ba9e56ff0957a1ace1d1870d0307b&w=1380"
            alt="adding image"
            className={styles.image}
          />
        </div>
        <div className={styles.splitColumn}>
          <img
            src="https://img.freepik.com/free-vector/willkommen-zum-oktoberfest-poster-banner-template-design_7102-243.jpg?w=1380"
            alt="adding image"
            className={styles.image}
          />
          3
        </div>
      </div>
    </div>
  )
}
