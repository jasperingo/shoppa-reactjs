import { FETCH_STATUSES } from "../../repositories/Fetch";

const deliveryFirmState = {
  
  deliveryFirm: null,
  deliveryFirmID: null,
  deliveryFirmToken: null,
  deliveryFirmAdminID: null,
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
  
  deliveryBaseRoutes: [],
  deliveryBaseRoutesPage: 1,
  deliveryBaseRoutesLoading: true,
  deliveryBaseRoutesNumberOfPages: 0,
  deliveryBaseRoutesFetchStatus: FETCH_STATUSES.LOADING,

  reviews: [],
  reviewsPage: 1,
  reviewsLoading: true,
  reviewsNumberOfPages: 0,
  reviewsFetchStatus: FETCH_STATUSES.LOADING,

  orders: [],
  ordersPage: 1,
  ordersLoading: true,
  ordersNumberOfPages: 0,
  ordersFetchStatus: FETCH_STATUSES.LOADING,

  transactions: [],
  transactionsPage: 1,
  transactionsLoading: true,
  transactionsNumberOfPages: 0,
  transactionsFetchStatus: FETCH_STATUSES.LOADING,

  transactionBalance: null,
  transactionBalanceLoading: true,
  transactionBalanceFetchStatus: FETCH_STATUSES.LOADING,

};

export default deliveryFirmState;
