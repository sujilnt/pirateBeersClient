import React from 'react';
import {Card, Empty, Rate} from "antd";
import {SettingOutlined,EditOutlined,EllipsisOutlined} from "@ant-design/icons";
import type {Product} from "@/api";
import styles from "./style.less";
import {history} from "umi";

interface ProductListProps{
  products: Product[];
}

const onClick =(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string)=>{
  e.preventDefault();
  history.push(`/product/${id}`)
};

export default function({products}: ProductListProps){
  return(
    <div className={styles.container} >
      {products?.map((product)=>{
        return (
          <div
            className={styles.card}
            onClick={(e)=>onClick(e, product.id)}
          >
            <div className={styles.cardImageContainer}>
              <img src={product.image} className={styles.cardImage}/>
            </div>
            <div className={styles.cardLabel}>
              <div className={styles.title}>{product.title}</div>
              <Rate disabled defaultValue={product.rating} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
