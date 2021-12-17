
import { STORE, PRODUCT, REVIEW, FETCH_STATUSES, PROMOTION } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";
import { initialStoreState } from "../AppInitialStates";


export default function StoreReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  

    case STORE.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        stores: {
          ...state.stores,
          storesFetchStatus: action.payload
        }
      };
    
    case STORE.LIST_FETCHED :
      let statusx = fetchUpdater(
        state.stores.storesPage, 
        action.payload.storesNumberOfPages, 
        state.stores.stores.length, 
        action.payload.stores.length
      );
      
      const st = state.stores.stores.filter(i=> i !== null);
      
      return {
        ...state,
        stores: {
          storesFetchStatus: statusx,
          storesPage: state.stores.storesPage+1,
          storesNumberOfPages: action.payload.storesNumberOfPages,
          stores: [...st, ...action.payload.stores, null],
        }
      };

    case STORE.UNFETCH: 
      return initialStoreState;
    
    case STORE.FETCH_STATUS_CHANGED :
      return {
        ...state,
        store: {
          store: state.store.store,
          storeFetchStatus: action.payload
        }
      };
    
    case STORE.FETCHED :
      return {
        ...state,
        store: {
          store: action.payload, 
          storeFetchStatus: FETCH_STATUSES.DONE,
        }
      };

    case PRODUCT.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        products: {
          ...state.products,
          productsFetchStatus: action.payload
        }
      };
    
    case PRODUCT.LIST_FETCHED :
      let status = fetchUpdater(
        state.products.productsPage,
        action.payload.productsNumberOfPages,
        state.products.products.length,
        action.payload.products.length
      );
      
      const prod = state.products.products.filter(i=> i !== null);

      return {
        ...state,
        products: {
          productsFetchStatus: status,
          productsPage: state.products.productsPage+1,
          productsCategory: state.products.productsCategory,
          productsNumberOfPages: action.payload.productsNumberOfPages,
          products: [...prod, ...action.payload.products, null],
        }
      };
    
    case PRODUCT.FILTER_CHANGED :
      return {
        ...state,
        products: {
          ...initialStoreState.products,
          products: [null],
          productsCategory: action.payload
        }
      };

    case REVIEW.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        reviews: {
          ...state.reviews,
          reviewsFetchStatus: action.payload
        }
      };

    case REVIEW.LIST_FETCHED:
      let status2 = fetchUpdater(
        state.reviews.reviewsPage,
        action.payload.reviewsNumberOfPages,
        state.reviews.reviews.length,
        action.payload.reviews.length
      );
        
      const rev = state.reviews.reviews.filter(i=> i !== null);

      return {
        ...state,
        reviews: {
          reviewsFetchStatus: status2,
          reviewsPage: state.reviews.reviewsPage+1,
          reviewsNumberOfPages: action.payload.reviewsNumberOfPages,
          reviews: [...rev, ...action.payload.reviews, null],
        }
      }; 

    case PROMOTION.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        promotions: {
          ...state.promotions,
          promotionsFetchStatus: action.payload
        }
      };

    case PROMOTION.LIST_FETCHED:
      let status3 = fetchUpdater(
        state.promotions.promotionsPage,
        action.payload.promotionsNumberOfPages,
        state.promotions.promotions.length,
        action.payload.promotions.length
      );
        
      const prom = state.promotions.promotions.filter(i=> i !== null);

      return {
        ...state,
        promotions: {
          promotionsFetchStatus: status3,
          promotionsPage: state.promotions.promotionsPage+1,
          promotionsNumberOfPages: action.payload.promotionsNumberOfPages,
          promotions: [...prom, ...action.payload.promotions, null],
        }
      }; 
    
    default:
      return state;
  }
}

