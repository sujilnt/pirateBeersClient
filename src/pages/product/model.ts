import type {Put} from "redux-saga/effects";
import {Product} from "@/api";
import api from "@/services/api";
import {notification} from "antd";

export enum ProductAction {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
  SET_PRODUCTS = "SET_PRODUCTS",
  //For single products
  FETCH_SELECTED_PRODUCT_INFO = "FETCH_SELECTED_PRODUCT_INFO",
  SET_SELECTED_PRODUCT_INFO = "SET_SELECTED_PRODUCT_INFO"
}
export interface ProductState{
 products?: Product[];
  selectedProduct: Product
}

const initialState ={
  products: undefined,
  selectedProduct: undefined
};

export default {
  namespace: "products",
  state: initialState,
  reducers: {
    [ProductAction.SET_PRODUCTS](state: ProductState, {products}:{ products :Product[]}){
      state.products = products;
    },
    [ProductAction.SET_SELECTED_PRODUCT_INFO](state: ProductState, {selectedProduct}:{ selectedProduct :Product}){
      state.selectedProduct = selectedProduct;
    }
  },
  effects: {
    *[ProductAction.FETCH_PRODUCTS](_payload:any, {call, put}:{put:Put, call:Function}){
      try {
        const products:Product[] = yield call(()=> api.products.getAllProducts());
        yield put.resolve({
          type: ProductAction.SET_PRODUCTS,
          products
        });
      } catch (e) {
        notification.error({
          message: 'could not fetch all products',
        });
      }
    },
    *[ProductAction.FETCH_SELECTED_PRODUCT_INFO]({id}:{id:string}, {call, put}:{call:Function, put:Put}){
      try{
        const product:Product = yield call (()=>api.products.getProductById({id}));
        yield put.resolve({
          type: ProductAction.SET_SELECTED_PRODUCT_INFO,
          selectedProduct: product
        })
      }catch (e) {
        console.error(e);
        notification.error({
          message: 'could not fetch  products information',
        });
      }
    }
  }
}
