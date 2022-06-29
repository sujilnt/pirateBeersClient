import React from "react";
import {Product} from "@/api";
import styles from "./style.less";
import {Rate} from "antd";

/**
 * abv: 5.2
 * category: "wheat_ale"
 * description: "Hop driven and sessionable. Crafted with a focus on complementing mellow malt sweetness with a tropical hoppy brightness. Truly an ale built for Summer.\nLawn mowed? Grab an Equatorial. Heading to a music festival? Grab an Equatorial. Floating down a river? Grab an Equatorial. You follow?"
 * ibu: 31
 * id: "FceO5R"
 * image: "https://brewerydb-images.s3.amazonaws.com/beer/FceO5R/upload_fJsFzS-contentAwareMedium.png"
 * listedSince: "20/02/2020"
 * price: 5.4
 * rating: 4
 * tags: ["Crisp & Clean", " Malty & Sweet"]
 */
interface ProductInformationProps{
  product: Product
}
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
