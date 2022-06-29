import React, {useEffect} from "react";
import {useSelector, useDispatch, Dispatch} from "umi";
import {Spin, Slider, Tooltip, Empty} from "antd";
import {GlobalState} from "@/service/interfaces";
import {QuestionCircleOutlined} from "@ant-design/icons";

import {CategoryAction, CategoryState} from "@/pages/categories/model";
import styles from "./style.less";
import {ProductAction} from "@/pages/product/model";
import Products from "../../../mock/products";
import {Product} from "@/api";
import ProductList from "@/components/ProductList";

interface BeerCategoryProps extends CategoryState{
  isFetchingCategories: boolean;
}

const CategoryBeerPropertiesExplanations = {
  srm: {
    title: "Standard Reference Method (SRM)",
    explanation: "Standard Reference Method (SRM) refers to a beer’s color. A very pale beer, such as American wheat," +
      " typically has an SRM of 5, while a dark colored stout is usually in the range of 25-40 SRM.",
    marks: {
      0: {
        style: {
          color: "white",
        },
        label: <span className={styles.sliderLabel}>PALE</span>
      },
      100: {
        style: {
          color: "white",
        },
        label: <span className={styles.sliderLabel}>DARK</span>,
      }
    }
  },
  ibu: {
    title: "International Bitterness Units (IBU)",
    explanation: "International Bitterness Units (IBU) is the measure of hops’ contribution to a beer's bitterness." +
      " It can range from zero to over 100. Beer bitterness is subject to perception." +
      " What is aggressively bitter to some is mildly bitter to others. " +
      "Also, bitterness can seem lower in the presence of residual sugar, " +
      "carbonation and cooler temperatures.",
    marks: {
      0: {
        style: {
          color: "white",
        },
        label: <span className={styles.sliderLabel}>LOW</span>
      },
      100: {
        style: {
          color: "white",
        },
        label: <span className={styles.sliderLabel}>HiGH</span>,
      }
    }
  },
  abv: {
    title: "Alcohol by Volume (ABV)",
    explanation: "Alcohol by Volume (ABV) varies by craft beer style from around 3% to more than 20%. " +
      "Alcohol flavor may be perceived, and is sometimes desirable, in craft beers with higher ABV.",
    marks: {
      0: {
        label: <span className={styles.sliderLabel}>LOW</span>
      },
      100: {
        label: <span className={styles.sliderLabel}>HiGH</span>,
      }
    }
  },
};

function getDispatchMethods(dispatch: Dispatch) {
  return {
    onMount() {
      dispatch({
        type: `productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORY}`,
        id: window.location.pathname.split("/categories/")[1]
      });

      dispatch({
        type: `products/${ProductAction.FETCH_PRODUCTS}`
      })
    },
    cleanUp() {
      dispatch({
        type: `productCategory/${CategoryAction.RESET_STATE}`
      })
    }
  }
}

function BeerCategory() {
  const {onMount, cleanUp} = getDispatchMethods(useDispatch());
  const { category, isFetchingCategories, products}: BeerCategoryProps = useSelector((state: GlobalState) => ({
    ...state.productCategory,
    isFetchingCategories: state.loading.effects[`productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORY}`],
    products: state.products.products?.filter((product:Product)=>product.category?.toLowerCase() ===  window.location.pathname.split("/categories/")[1]) || undefined
  }));

  useEffect(() => {
    onMount();
    return cleanUp
  }, []);

  return (
    <div className={styles.categoryContainer}>
      <Spin spinning={isFetchingCategories} className={styles.spinner}>
        {!!category && category.title ? (
          <div className={styles.categoryInformationContainer}>
            <div className={styles.categoryInformation}>
              <img src={category?.image} className={styles.responsiveImage}/>
              <div className={styles.descriptionContainer}>
                <h1>{category?.title}</h1>
                <h2>{category?.description}</h2>
                <div className={styles.price}>
                  <div className={styles.section}>
                    <h1>Average price</h1>
                    <div>£ {Math.round(category.averagePrice)} </div>
                  </div>
                  <div className={styles.section}>
                    <h1>total Beers</h1>
                    <div>{category.totalBeers}</div>
                  </div>
                </div>
                <div className={styles.measurements}>
                  <h1>Measurements</h1>
                  <div className={styles.sliderContainer}>
                    <Slider
                      range
                      marks={CategoryBeerPropertiesExplanations.srm.marks}
                      defaultValue={[category.srm.min, category.srm.max]}
                      disabled
                      className={styles.srmSlider}
                    />
                    <h3>
                      {category.srm.min} - {category.srm.max} SRM (Colour)
                      &nbsp;
                      <Tooltip title={CategoryBeerPropertiesExplanations.srm.explanation}>
                        <QuestionCircleOutlined/>
                      </Tooltip>
                    </h3>
                  </div>
                  <div className={styles.sliderContainer}>
                    <Slider
                      range
                      marks={CategoryBeerPropertiesExplanations.ibu.marks}
                      defaultValue={[category.ibu.min, category.ibu.max]}
                      disabled
                      className={styles.ibuAndAbvSlider}
                    />
                    <h3>
                      {category.ibu.min} - {category.ibu.max} IBU (Bitterness)
                      &nbsp;
                      <Tooltip title={CategoryBeerPropertiesExplanations.ibu.explanation}>
                        <QuestionCircleOutlined/>
                      </Tooltip>
                    </h3>
                  </div>
                  <div className={styles.sliderContainer}>
                    <Slider
                      range
                      marks={CategoryBeerPropertiesExplanations.abv.marks}
                      defaultValue={[category.abv.min, category.abv.max]}
                      className={styles.ibuAndAbvSlider}
                      disabled
                    />
                    <h3>
                      {category.abv.min} - {category.abv.max} ABV (Alcohol) &nbsp;
                      <Tooltip title={CategoryBeerPropertiesExplanations.abv.explanation}>
                        <QuestionCircleOutlined/>
                      </Tooltip>
                    </h3>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : <Empty/>}
      </Spin>
      <div className={styles.productContainer}>
          { !!products && products?.length
            ? <ProductList products={products} />
            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          }
      </div>
    </div>
  );
}

BeerCategory.title = "Beer Category"
export default BeerCategory;
