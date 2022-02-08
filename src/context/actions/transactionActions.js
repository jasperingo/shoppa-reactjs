
export const TRANSACTION = {
  FETCHED: 'TRANSACTION_FETCHED',
  UNFETCHED: 'TRANSACTION_UNFETCHED',
  FETCH_STATUS_CHANGED: 'TRANSACTION_FETCH_STATUS_CHANGED',

  BALANCE_FETCHED: 'TRANSACTION_BALANCE_FETCHED',
  BALANCE_UNFETCHED: 'TRANSACTION_BALANCE_UNFETCHED',
  BALANCE_FETCH_STATUS_CHANGED: 'TRANSACTION_BALANCE_FETCH_STATUS_CHANGED',
  
  LIST_FETCHED: 'TRANSACTIONS_FETCHED',
  LIST_UNFETCHED: 'TRANSACTIONS_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'TRANSACTIONS_FETCH_STATUS_CHANGED',
};

export const getTransactionFetchStatusAction = (fetchStatus, id, loading) => ({
  type: TRANSACTION.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getTransactionBalanceFetchStatusAction = (fetchStatus, loading) => ({
  type: TRANSACTION.BALANCE_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

export const getTransactionsListFetchStatusAction = (fetchStatus, loading) => ({
  type: TRANSACTION.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});


