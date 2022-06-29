import React from "react";
import {Product} from "@/api";
import styles from "./style.less";
import {Rate} from "antd";

interface ProductInformationProps{
  product: Product
}

/**
 *  A component used to display the product information
 * @param product
 * @type ProductInformation
 */

export function ProductInformation({product}:ProductInformationProps ){
  return(
    <div className={styles.container}>
      <div>
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.title}/>
        </div>
      </div>
      <div className={styles.productInfoTableContainer}>
        <h3>Detailed Product Information</h3>
        <h4>{product.title}</h4>
        <Rate disabled defaultValue={product.rating} allowHalf/>
        <h2>£{product.price}</h2>

        <div className={styles.productDescription}>
          <h4>Description</h4>
          {product.description}
        </div>
        <div>
          <h4>Tags</h4>
          <div>
            {product.tags?.join(",")}
          </div>
        </div>
      </div>
    </div>
  )
}
