
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStoreFetchStatusAction, STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreFetch() {

  const { ID } = useParams();

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        storeFetchStatus
      } 
    },
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (storeFetchStatus !== FETCH_STATUSES.LOADING && storeFetchStatus !== FETCH_STATUSES.DONE)
        storeDispatch(getStoreFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [storeFetchStatus, storeDispatch]
  );
  
  useEffect(
    ()=> {

      if (store !== null && store.id !== Number(ID)) {
        
        storeDispatch({ type: STORE.UNFETCHED });

      } else if (storeFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        storeDispatch(getStoreFetchStatusAction(FETCH_STATUSES.ERROR));

      } else if (storeFetchStatus === FETCH_STATUSES.LOADING) {

        const api = new StoreRepository(customerToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            storeDispatch({
              type: STORE.FETCHED, 
              payload: {
                store: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else if (res.status === 404) {
            storeDispatch(getStoreFetchStatusAction(FETCH_STATUSES.NOT_FOUND));
          } else if (res.status === 403) {
            storeDispatch(getStoreFetchStatusAction(FETCH_STATUSES.FORBIDDEN));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          storeDispatch(getStoreFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    }
  );

  return [store, storeFetchStatus, refetch];
}

