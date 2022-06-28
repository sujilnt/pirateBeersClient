import React, {useEffect} from "react";
import {Dispatch, useDispatch, useSelector} from "umi";
import {GlobalState} from "@/interfaces";
import {ProductAction} from "@/pages/product/model";


function getDispatchMethods(dispatch:Dispatch){
  return{
    onMount(){
      dispatch({
        type: `products/${ProductAction.FETCH_SELECTED_PRODUCT_INFO}`,
        id:  window.location.pathname.split("/product/")[1]
      })
    }
  }
}

export default function (props) {
  const {onMount} = getDispatchMethods(useDispatch());
  const {selectedProduct} = useSelector((state:GlobalState)=>state.products);
  useEffect(()=>{
      onMount();
  },[])


  return <div>product {JSON.stringify(selectedProduct)};</div>



}
