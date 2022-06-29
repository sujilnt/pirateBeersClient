import type { Put } from 'redux-saga/effects';
import { Product } from '@/api';
import api from '@/service/api';
import { notification } from 'antd';
import { Model } from 'dva';
import { Key } from 'react';
import { GlobalState } from '@/service/interfaces';

export enum ProductAction {
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  SET_PRODUCTS = 'SET_PRODUCTS',
  SET_SELECTED_PRODUCTS = 'SET_SELECTED_PRODUCTS',
  DELETE_PRODUCTS = 'DELETE_PRODUCTS',
  ADD_PRODUCT = 'ADD_PRODUCT',
  FETCH_PRODUCT_RECOMMENDATIONS = 'FETCH_PRODUCT_RECOMMENDATIONS',
  SET_PRODUCT_RECOMMENDATIONS = 'SET_PRODUCT_RECOMMENDATIONS',
}
export interface ProductState {
  products?: Product[];
  selectedProducts: Key[];
  recommendations: Product[];
}

const initialState = {
  products: undefined,
  selectedProducts: undefined,
  recommendations: undefined,
};

export default {
  namespace: 'products',
  state: initialState,
  reducers: {
    [ProductAction.SET_PRODUCTS](
      state: ProductState,
      { products }: { products: Product[] },
    ) {
      state.products = products;
    },
    [ProductAction.SET_SELECTED_PRODUCTS](
      state: ProductState,
      { selectedProducts }: { selectedProducts: string[] },
    ) {
      state.selectedProducts = selectedProducts;
    },
    [ProductAction.SET_PRODUCT_RECOMMENDATIONS](
      state: ProductState,
      { recommendations }: { recommendations: Product[] },
    ) {
      state.recommendations = recommendations;
    },
  },
  effects: {
    *[ProductAction.FETCH_PRODUCTS](
      _payload: any,
      { call, put }: { put: Put; call: Function },
    ) {
      try {
        const products: Product[] = yield call(() =>
          api.products.getAllProducts(),
        );
        yield put.resolve({
          type: ProductAction.SET_PRODUCTS,
          products,
        });
      } catch (e) {
        notification.error({
          message: 'could not fetch all products',
        });
      }
    },
    *[ProductAction.DELETE_PRODUCTS](
      _payload: any,
      { put, call, select }: { put: Put; call: Function; select: Function },
    ) {
      const ids: Key[] = yield select(
        (state: GlobalState) => state.products.selectedProducts,
      );
      try {
        yield call(() =>
          api.products.deleteProductsByIds({
            ids: ids as string[],
          }),
        );

        yield put({
          type: ProductAction.FETCH_PRODUCTS,
        });

        yield put({
          type: ProductAction.SET_SELECTED_PRODUCTS,
          selectedProducts: undefined,
        });
      } catch (e) {
        notification.error({
          message: 'could not delete the products',
        });
      }
    },
    *[ProductAction.ADD_PRODUCT](
      { product }: { product: Product },
      { put, call, select }: { put: Put; call: Function; select: Function },
    ) {
      try {
        yield call(() =>
          api.products.addProduct({
            product,
          }),
        );

        yield put({ type: ProductAction.FETCH_PRODUCTS });
      } catch (e) {
        notification.error({
          message: 'could not add products',
        });
      }
    },
    *[ProductAction.FETCH_PRODUCT_RECOMMENDATIONS](
      _payload: any,
      { call, put }: { put: Put; call: Function },
    ) {
      try {
        const recommendations: Product[] = yield call(() =>
          api.products.getProductRecommendations(),
        );

        yield put.resolve({
          type: ProductAction.SET_PRODUCT_RECOMMENDATIONS,
          recommendations,
        });
      } catch (e) {
        notification.error({
          message: 'could not add products',
        });
      }
    },
  },
} as unknown as Model;
