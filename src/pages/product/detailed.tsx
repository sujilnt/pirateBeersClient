import React, {Key, useEffect} from "react";
import {Dispatch, useDispatch, useSelector} from "umi";
import {GlobalState} from "@/service/interfaces";
import {ProductAction} from "@/pages/product/model";
import {Product} from "@/api";
import {Button, Table,Popconfirm} from "antd";

import styles from "./style.less"
import {CategoryAction} from "@/pages/categories/model";
import {ProductInformation} from "@/components/Product";
import moment from "moment";
import {ColumnsType} from "antd/lib/table/interface";


function getDispatchMethods(dispatch:Dispatch){
  return{
    onMount(){
      dispatch({
        type: `products/${ProductAction.FETCH_PRODUCTS}`,
      });

      dispatch({
        type: `productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORIES}`
      });
    },

    onTableRowSelections(selectedProducts: Key[]){
      dispatch({
        type: `products/${ProductAction.SET_SELECTED_PRODUCTS}`,
        selectedProducts
      })
    },

    onDeleteProducts(){
      dispatch({
        type: `products/${ProductAction.DELETE_PRODUCTS}`,
      });
    }
  }
}



export default function () {
  const {onMount, onTableRowSelections, onDeleteProducts} = getDispatchMethods(useDispatch());
  const {
    selectedProducts,
    products,
    productCategories,
    isDeletingProducts,
    isFetchingProducts
  } = useSelector((state:GlobalState)=>({
    ...state.products,
    productCategories: state.productCategory.productCategories,
    isDeletingProducts: state.loading.effects[`products/${ProductAction.DELETE_PRODUCTS}`],
    isFetchingProducts: state.loading.effects[`products/${ProductAction.FETCH_PRODUCTS}`],
  }));
  useEffect(()=>{
    onMount();
  },[])

  const columns:ColumnsType<Product> = [
    {
      title: 'Product Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      onFilter(value, record:Product){
        return record.category === value;
      },
      filterSearch: true,
      filters: productCategories?.map(
        ({id, title})=>({
           text:title,
           value: id
        })
      )
    },{
      title: 'Price (£)',
      dataIndex: 'price',
      key: 'price',
      sorter: (record1:Product, record2:Product)=> record1.price - record2.price
    },{
      title: 'Listed Since',
      dataIndex: 'listedSince',
      key: 'listedSince',
      sorter: (record1:Product, record2:Product)=> {
        if(record1?.listedSince && record2?.listedSince){
          return (+record1?.listedSince) - +record2.listedSince
        }
        return 0;
      },
      render(listedDate:Date){
        return moment(listedDate).format('MMMM Do YYYY, h:mm:ss');;
      }
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={onDeleteProducts}
          okText="Yes"
          cancelText="No"
          placement="bottom"
          disabled={!selectedProducts || selectedProducts?.length==0}
        >
          <Button
            danger
            className={styles.deleteButton}
            loading={isDeletingProducts}
            disabled={!selectedProducts || selectedProducts?.length===0}
          >
            Delete
          </Button>
        </Popconfirm>
        <Table
          className={styles.table}
          dataSource={products}
          loading={isFetchingProducts}
          columns={columns}
          rowKey={(record)=> record.id}
          rowSelection={{
            type: "checkbox",
            onChange(keys:Key[]){
              onTableRowSelections(keys)
            }
          }}
          expandable={{
            expandedRowRender: (record:Product) => <ProductInformation product={record}/> ,
          }}
        />
      </div>
    </div>
  )
}
