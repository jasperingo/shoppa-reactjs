import { FETCH_STATUSES } from "../../repositories/Fetch";

const deliveryFirmState = {
  
  deliveryFirm: null,
  deliveryFirmID: null,
  deliveryFirmLoading: true,
  deliveryFirmFetchStatus: FETCH_STATUSES.LOADING,
    
  deliveryFirms: [],
  deliveryFirmsPage: 1,
  deliveryFirmsLoading: true,
  deliveryFirmsNumberOfPages: 0,
  deliveryFirmsFetchStatus: FETCH_STATUSES.LOADING,

  routes: [],
  routesPage: 1,
  routesLoading: true,
  routesNumberOfPages: 0,
  routesFetchStatus: FETCH_STATUSES.LOADING,

  reviews: [],
  reviewsPage: 1,
  reviewsLoading: true,
  reviewsNumberOfPages: 0,
  reviewsFetchStatus: FETCH_STATUSES.LOADING,

};

export default deliveryFirmState;
