
export const ORDER = {
  UNFETCHED: 'ORDER_UNFETCHED',
  FETCHED: 'ORDER_FETCHED',
  FETCH_STATUS_CHANGED: 'ORDER_FETCH_STATUS_CHANGED',

  LIST_FETCHED: 'ORDERS_FETCHED',
  LIST_UNFETCHED: 'ORDERS_UNFETCHED',
  LIST_FETCHING: 'ORDERS_FETCHING',
  LIST_ERROR_CHANGED: 'ORDERS_ERROR_CHANGED',
  LIST_FETCH_STATUS_CHANGED: 'ORDERS_FETCH_STATUS_CHANGED',
  LIST_STATUS_FILTER_CHANGED: 'ORDERS_STATUS_FILTER_CHANGED',

  UPDATED: 'ORDER_UPDATED',
  ITEM_UPDATED: 'ORDER_ITEM_UPDATED',
};

export const getOrderFetchStatusAction = (fetchStatus, id, loading) => ({
  type: ORDER.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getOrdersListFetchStatusAction = (fetchStatus, loading) => ({
  type: ORDER.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

