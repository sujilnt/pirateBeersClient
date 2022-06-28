import { notification } from "antd";
import {Category} from "@/api";
import type {Put} from "redux-saga/effects";
import api from "@/services/api";
import {GlobalState} from "@/interfaces";

export enum CategoryAction {
  FETCH_PRODUCT_CATEGORY = "FETCH_PRODUCT_CATEGORY",
  SET_PRODUCT_CATEGORY = "SET_PRODUCT_CATEGORY",
  FETCH_PRODUCT_CATEGORIES = 'FETCH_PRODUCT_CATEGORIES',
  SET_PRODUCT_CATEGORIES = 'SET_PRODUCT_CATEGORIES',

  RESET_STATE = "RESET_STATE"
};

export interface CategoryState {
  category?: Category,
  productCategories?: Category[]
}


const initialState ={
  category: undefined,
  productCategories: undefined
};
export default {
  namespace: "productCategory",
  state: initialState,
  reducers:{
    [CategoryAction.SET_PRODUCT_CATEGORY](state: CategoryState, {category}:{category: Category}) {
      state.category = category;
    },
    [CategoryAction.SET_PRODUCT_CATEGORIES](state: CategoryState, {productCategories}: {productCategories: Category[]}){
      state.productCategories = productCategories;
    },
    [CategoryAction.RESET_STATE](state: CategoryState){
      state.category = undefined;
    }
  },
  effects:{
    *[CategoryAction.FETCH_PRODUCT_CATEGORY]({id}:{id: string}, {put,call}:{put:Put, call:Function}){
      try{
        if(!!id){
          const category:Category[] = yield call(()=>api.products.getCategoryById({ id }));
          // usually all category id is unique
          yield put.resolve({
            type: `${CategoryAction.SET_PRODUCT_CATEGORY}`,
            category: category[0]
          });
        }
      } catch (e) {
        notification.error({
          message: 'could not fetch category information',
        })
      }
    },
    *[CategoryAction.FETCH_PRODUCT_CATEGORIES](_payload: any, {put, call,select}:{put:Put, call:Function, select:Function}){
      const state:CategoryState = yield select((globalState:GlobalState)=> globalState.productCategory);
      try{
        if(!state.productCategories){
          const productCategories: Category[] = yield call(()=>api.products.getAllProductCategories());
          yield put.resolve({
            type: CategoryAction.SET_PRODUCT_CATEGORIES,
            productCategories
          });
        }
      } catch (e) {
        notification.error({
          message: 'could not fetch all categories',
        });
      }
    }
  }
}
