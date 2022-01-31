import { useCallback, useEffect } from "react";
import { getSavedCartsListFetchStatusAction, SAVED_CART } from "../../context/actions/savedCartActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useSavedCartList(userId, userToken) {

  const { 
    savedCart: { 
      savedCartDispatch,
      savedCart: {
        savedCarts,
        savedCartsPage,
        savedCartsNumberOfPages,
        savedCartsFetchStatus
      } 
    }, 
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();


  const refetch = useCallback(
    ()=> {
      if (savedCartsFetchStatus !== FETCH_STATUSES.LOADING) 
        savedCartDispatch(getSavedCartsListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [savedCartDispatch, savedCartsFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      savedCartDispatch({ type: SAVED_CART.LIST_UNFETCHED });
    },
    [savedCartDispatch]
  );

  useEffect(
    ()=> {
      if (savedCartsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        savedCartDispatch(getSavedCartsListFetchStatusAction(FETCH_STATUSES.ERROR));

      } else if (savedCartsFetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new CustomerRepository(userToken);
        api.getSavedCartsList(userId, savedCartsPage)
        .then(res=> {
          
          if (res.status === 200) {
            savedCartDispatch({
              type: SAVED_CART.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  savedCartsPage, 
                  res.body.pagination.number_of_pages, 
                  savedCarts.length, 
                  res.body.data.length
                ),
              }
            });
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          savedCartDispatch(getSavedCartsListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [userId, userToken, savedCarts.length, savedCartsPage, savedCartsFetchStatus, savedCartDispatch, listStatusUpdater]
  );


  return [savedCarts, savedCartsFetchStatus, savedCartsPage, savedCartsNumberOfPages, refetch, refresh];
}
