
export const CATEGORY = {
  UNFETCHED: 'CATEGORY_UNFETCHED',
  FETCHED: 'CATEGORY_FETCHED',
  FETCH_STATUS_CHANGED: 'CATEGORY_FETCH_STATUS_CHANGED', 
  LIST_FETCHED: 'CATEGORIES_FETCHED',
  LIST_FETCH_STATUS_CHANGED: 'CATEGORIES_FETCH_STATUS_CHANGED',
  
  SUB_UNFETCH: 'SUB_CATEGORY_UNFETCH',
  SUB_FETCHED: 'SUB_CATEGORY_FETCHED',
  SUB_FETCH_STATUS_CHANGED: 'SUB_CATEGORY_FETCH_STATUS_CHANGED', 

  STORES_LIST_FETCHED: 'STORE_CATEGORIES_FETCHED',
  STORES_LIST_FETCH_STATUS_CHANGED: 'STORE_CATEGORIES_FETCH_STATUS_CHANGED',

  PRODUCTS_LIST_FETCHED: 'PRODUCT_CATEGORIES_FETCHED',
  PRODUCTS_LIST_FETCH_STATUS_CHANGED: 'PRODUCT_CATEGORIES_FETCH_STATUS_CHANGED',
};

export const getCategoryFetchStatusAction = (fetchStatus, id) => ({
  type: CATEGORY.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id
  }
});

export const getSubCategoryFetchStatusAction = (fetchStatus, id) => ({
  type: CATEGORY.SUB_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id
  }
});

export const getCategoriesListFetchStatusAction = (payload) => ({
  type: CATEGORY.LIST_FETCH_STATUS_CHANGED,
  payload
});

export const getStoreCategoriesListFetchStatusAction = (payload) => ({
  type: CATEGORY.STORES_LIST_FETCH_STATUS_CHANGED,
  payload
});

export const getProductCategoriesListFetchStatusAction = (payload) => ({
  type: CATEGORY.PRODUCTS_LIST_FETCH_STATUS_CHANGED,
  payload
});

