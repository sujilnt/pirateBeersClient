import { Button, Empty, Form, Input, InputNumber, Select, Spin } from 'antd';
import { Dispatch, useDispatch, useSelector } from 'umi';
import uuid from 'uuid';

import { CategoryAction } from '@/pages/categories/model';
import { useEffect } from 'react';
import { GlobalState } from '@/service/interfaces';
import styles from './style.less';
import { ProductAction } from '@/pages/product/model';
import { Product } from '@/api';

const { TextArea } = Input;
const { Option } = Select;

const tags = ['Dark & Roasty', 'Crisp & Clean, Malty & Sweet', 'Crisp & Clean'];

function getDispatchMethods(dispatch: Dispatch) {
  return {
    onMount() {
      dispatch({
        type: `productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORIES}`,
      });
    },

    onAddProduct(product: Product) {
      dispatch({
        type: `products/${ProductAction.ADD_PRODUCT}`,
        product,
      });
    },

    onChange(_fields: any, allFields: any[]) {
      dispatch({
        type: `products/${ProductAction.SET_PRODUCT_FIELDS}`,
        productFields: allFields,
      });
    },
  };
}

export default function () {
  const { onMount, onAddProduct, onChange } = getDispatchMethods(useDispatch());
  const { categories, fields, isFetchingCategories, isSubmittingProduct } =
    useSelector((state: GlobalState) => ({
      categories: state.productCategory.productCategories,
      fields: state.products.productFields,
      isFetchingCategories:
        state.loading.effects[
          `productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORIES}`
        ],
      isSubmittingProduct:
        state.loading.effects[`products/${ProductAction.ADD_PRODUCT}`],
    }));

  useEffect(() => {
    onMount();
  }, []);

  return (
    <Spin spinning={isFetchingCategories}>
      <h1 className={styles.heading}>Add Product</h1>
      <div className={styles.productFormContainer}>
        <Form
          layout="vertical"
          className={styles.form}
          fields={fields}
          onFinish={onAddProduct}
          onFieldsChange={onChange}
        >
          <Form.Item
            label="Product Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter the product title',
              },
            ]}
          >
            <Input placeholder="Enter the product name" />
          </Form.Item>
          <Form.Item
            label="Product Image"
            name="image"
            rules={[
              {
                required: true,
                message: 'please enter the product image',
              },
            ]}
          >
            <Input placeholder="Enter the url of the image" />
          </Form.Item>
          <Form.Item
            label="Product Category"
            name="category"
            rules={[
              {
                required: true,
                message: 'Please enter the category',
              },
            ]}
          >
            <Select>
              {!!categories?.length
                ? categories.map((category) => {
                    return (
                      <Option value={category.id}>{category.title}</Option>
                    );
                  })
                : null}
            </Select>
          </Form.Item>
          <Form.Item
            label="Packed Type"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please select the product types',
              },
            ]}
          >
            <Select>
              <Option value="bottle">Bottle</Option>
              <Option value="can">Can</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Product Tags"
            name="tags"
            rules={[
              {
                required: true,
                message: 'Please select the product tags',
              },
            ]}
          >
            <Select mode="tags" placeholder="Please select">
              {tags.map((tag) => {
                return <Option value={tag}>{tag}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Product Price (£) "
            name="price"
            rules={[
              {
                required: true,
                validator(_, value: number) {
                  if (value <= 0 || !value) {
                    return Promise.reject(
                      new Error(
                        'Product price cant be zero or less than zero or undefined',
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Product Description"
            className={styles.description}
            name="description"
            rules={[
              {
                required: true,
                message: 'Please enter the product description ',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmittingProduct}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
}
