import styles from './index.less';
import CategoryCard from '@/components/CaterogyCard';
import { useDispatch, useSelector, Dispatch } from 'umi';
import { CategoryAction } from '@/pages/categories/model';
import { GlobalState } from '@/service/interfaces';
import React, { useEffect } from 'react';
import { Category } from '@/api';
import { Empty, Spin } from 'antd';
import ProductList from '@/components/ProductList';
import { ProductAction } from '@/pages/product/model';

function Index() {
  const { onMount, cleanUp } = getDispatchMethods(useDispatch());

  const { categories, isFetchingCategories, recommendations } = useSelector(
    (state: GlobalState) => ({
      isFetchingCategories:
        state.loading.effects[
          `productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORIES}`
        ],
      categories: state.productCategory.productCategories,
      recommendations: state.products.recommendations,
    }),
  );

  useEffect(() => {
    onMount();

    return cleanUp;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <h2>General Catalogue</h2>
        <Spin tip="Loading..." spinning={isFetchingCategories}>
          <div className={styles.categoryContent}>
            {categories?.length
              ? categories.map((category: Category) => {
                  return <CategoryCard category={category} key={category.id} />;
                })
              : null}
          </div>
        </Spin>
      </div>
      <div className={styles.recommendationsContainer}>
        <h2>Recommended Products</h2>
        {!!recommendations && recommendations?.length ? (
          <ProductList products={recommendations} />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </div>
  );
}

function getDispatchMethods(dispatch: Dispatch) {
  return {
    onMount() {
      dispatch({
        type: `productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORIES}`,
      });

      dispatch({
        type: `products/${ProductAction.FETCH_PRODUCT_RECOMMENDATIONS}`,
      });
    },
    cleanUp() {
      dispatch({
        type: `productCategory/${CategoryAction.RESET_STATE}`,
      });
    },
  };
}

Index.title = 'Home Page';
export default Index;
