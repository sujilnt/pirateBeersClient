import type {ProductState} from "@/pages/product/model";
import type {CategoryState} from "@/pages/categories/model";

export interface GlobalState{
  products: ProductState;
  productCategory: CategoryState;
  loading: any
}
