import React, {useEffect, useState} from "react";
import {Dispatch, ProductAction} from "@@/plugin-dva/connect";
import {useDispatch} from "umi";
import {Table} from "antd"
import {GlobalState} from "@/service/interfaces";
import ProductList from "@/components/ProductList";

function getDispatchMethods(dispatch:Dispatch){
  return{
    onMount(){
      dispatch({
        type: `products/${ProductAction.FETCH_PRODUCTS}`,
      });
    }
  }
}



export default function Catalogue(){
  const {onMount} = getDispatchMethods(useDispatch());
  const {products} = useState((globalState:GlobalState)=> ({
    products: globalState.products.products
  }));

  useEffect(()=>{
    onMount()
  },[]);



  return (
    <div>
      <ProductList />
    </div>
  );

}
