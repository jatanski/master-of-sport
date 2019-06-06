import {
  newProductReducer,
  allProductsReducer,
  sumProductsReducer
} from "./duck/reducers";

export { default as newProductTypes } from "./duck/types";
export { default as newProductActions } from "./duck/actions";
export { newProductReducer, allProductsReducer, sumProductsReducer };
