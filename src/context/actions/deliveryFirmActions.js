
export const DELIVERY_FIRM = {
  AUTHED: 'DELIVERY_FIRM_AUTHED',
  UNAUTHED: 'DELIVERY_FIRM_UNAUTHED',

  FETCHED: 'DELIVERY_FIRM_FETCHED',
  UNFETCHED: 'DELIVERY_FIRM_UNFETCHED',
  FETCHING: 'DELIVERY_FIRM_FETCHING',
  ERROR_CHANGED: 'DELIVERY_FIRM_ERROR_CHANGED',
  
  LIST_FETCHED: 'DELIVERY_FIRMS_FETCHED',
  LIST_UNFETCHED: 'DELIVERY_FIRMS_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'DELIVERY_FIRMS_FETCH_STATUS_CHANGED',
};

export const getDeliveryFirmFetchStatusAction = (fetchStatus, id, loading) => ({
  type: DELIVERY_FIRM.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getDeliveryFirmsListFetchStatusAction = (fetchStatus, loading) => ({
  type: DELIVERY_FIRM.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});
