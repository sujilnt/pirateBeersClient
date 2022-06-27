import type {Put} from "redux-saga/effects";
import {Product} from "@/api";
import api from "@/services/api";
import {notification} from "antd";

export enum ProductAction {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
  SET_PRODUCTS = "SET_PRODUCTS",

}
export interface ProductState{
 products?: Product[]
}

const initialState ={
  products: undefined
};

export default {
  namespace: "products",
  state: initialState,
  reducers: {
    [ProductAction.SET_PRODUCTS](state: ProductState, {products}:{ products :Product[]}){
      state.products = products;
    }
  },
  effects: {
    *[ProductAction.FETCH_PRODUCTS](_payload:any, {call, put}:{put:Put, call:Function}){
      console.log("product is called");
      try {
        const products:Product[] = yield call(()=> api.products.getAllProducts());
        console.log("products", products);
        yield put.resolve({
          type: ProductAction.SET_PRODUCTS,
          products
        });
      }catch (e) {
        console.error(e);
        notification.error({
          message: 'could not fetch all products',
        });
      }
    }
  }
}
