import { FETCH_STATUSES } from "../../repositories/Fetch";

export const categoryState = {
  
  category: null,
  categoryID: null,
  categoryFetchStatus: FETCH_STATUSES.LOADING,
  
  subCategory: null,
  subCategoryID: null,
  subCategoryFetchStatus: FETCH_STATUSES.LOADING,

  stores: [],
  storesFetchStatus: FETCH_STATUSES.LOADING,
  
  products: [],
  productsFetchStatus: FETCH_STATUSES.LOADING
  
};


export default categoryState;

