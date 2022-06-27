import React from "react";
import styles from "./style.less";

import {getLink} from "@/components/Navbar";
import type {Category} from "@/api";

interface CategoryCardProps{
  category: Category,
  key: string
}

function getFirstLine(line:string):string{
 return line.split(".")[0]
}

export default function CategoryCard({category}: CategoryCardProps) {
  return(
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <img src={category.image}
             className={styles.categoryImage}
        />
        <div className={styles.description}>
          <h2>{category.title}</h2>
          <p className={styles.overflowText}>{getFirstLine(category.description)}.</p>
          <div className={styles.cardLink}>{getLink(category.url, "Read More")}</div>
        </div>
      </div>
      <div className={styles.title}>
        {getLink(category.url, category.title)}
      </div>
    </div>
  )
}
