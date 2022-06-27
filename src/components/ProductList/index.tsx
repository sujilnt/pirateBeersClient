import React from 'react';
import {Card, Empty, Rate} from "antd";
import {SettingOutlined,EditOutlined,EllipsisOutlined} from "@ant-design/icons";
import type {Product} from "@/api";
import styles from "./style.less";


const { Meta } = Card;

interface ProductListProps{
  products: Product[];
}

export default function({products}: ProductListProps){

  return(
    <div className={styles.container}>
      {products?.map((product)=>{
        return (
          <Card
            hoverable
            className={styles.card}
            cover={
              <img
                alt={product.title}
                src={product.image}
                className={styles.cardImage}
              />
            }
          >
            <div>
              <Rate disabled defaultValue={product.rating} />
            </div>
            {product.title}
          </Card>
        )
      })}
    </div>
  )
}
