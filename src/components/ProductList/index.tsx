import React from 'react';
import { Rate } from 'antd';
import type { Product } from '@/api';
import styles from './style.less';
import { history } from 'umi';

interface ProductListProps {
  products: Product[];
}

const onClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: string,
) => {
  e.preventDefault();
  history.push(`/product/${id}`);
};

export default function ({ products }: ProductListProps) {
  return (
    <div className={styles.container}>
      {products?.map((product) => {
        return (
          <div
            className={styles.card}
            onClick={(e) => onClick(e, product.id)}
            title={product.title}
          >
            <div className={styles.cardImageContainer}>
              <img src={product.image} className={styles.cardImage} />
            </div>
            <div className={styles.cardLabel}>
              <Rate disabled defaultValue={product.rating} />
              <div className={styles.title} title={product.title}>
                {product.title}
              </div>
              <div className={styles.title}>£ {product.price}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
