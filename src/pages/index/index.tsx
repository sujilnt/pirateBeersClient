import styles from './index.less';
import HomePageBanners from "@/components/HomePageBanners";
import CategoryCard from "@/components/CaterogyCard";
import {useDispatch, useSelector, Dispatch} from 'umi';
import {CategoryAction} from "@/pages/categories/model";
import {GlobalState} from "@/interfaces";
import {useEffect} from "react";
import {Category} from "@/api";
import {Spin} from "antd";



function Index(){
  const {getCategories, cleanUp} = getDispatchMethods(useDispatch());

  const { categories, isFetchingCategories } = useSelector((state: GlobalState) => ({
    isFetchingCategories: state.loading.effects[`productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORIES}`],
    categories: state.productCategory.productCategories,
  }));

  useEffect(()=>{
   getCategories();
   return cleanUp;
  },[]);

  return (
    <div className={styles.container}>
      <HomePageBanners/>
      <div className={styles.category}>
        <h1>Beer Categories</h1>
        <Spin tip="Loading..." spinning={isFetchingCategories}>
        <div className={styles.categoryContent}>
          { categories?.length ?
            categories.map((category:Category) => {
              return (
                <CategoryCard category={category} key={category.id}/>
              )
            }): null}
        </div>
        </Spin>
      </div>
      <div className={styles.products}>
        <h1>New Products</h1>
      </div>
    </div>
  );
}

function getDispatchMethods(dispatch: Dispatch) {
  return {
    getCategories: function () {
      dispatch({
        type: `productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORIES}`
      });
    },
    cleanUp() {
      dispatch({
        type: `productCategory/${CategoryAction.RESET_STATE}`
      });
    }
  }
}


Index.title = "Home Page"
export default Index;
