import { useState, useCallback, useMemo } from 'react';
import { CUSTOMER } from '../../context/actions/customerActions';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import CustomerRepository from '../../repositories/CustomerRepository';
import { FETCH_STATUSES } from '../../repositories/Fetch';
import { useAppContext } from '../contextHook';
import { useMessageFetch } from '../message/messageFetchHook';
import { useMessageUnreceivedCountFetch } from '../message/messageUnreceivedCountFetchHook';
import { useCustomerAuthGet, useCustomerAuthUnset } from './customerAuthStorageHook';

export function useAuthCustomerFetch() {

  const { 
    customer: { dispatch } 
  } = useAppContext();

  const newMessage = useMessageFetch();

  const messageCount = useMessageUnreceivedCountFetch();

  const [customerId, customerToken] = useCustomerAuthGet();

  const unsetAuth = useCustomerAuthUnset();

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const api = useMemo(function() { return new CustomerRepository(customerToken); }, [customerToken]);
  
  const fetch = useCallback(
    async function() {

      if (loading) return;

      if (!window.navigator.onLine) {
        setError(NetworkErrorCodes.NO_NETWORK_CONNECTION);
        return;
      }

      setLoading(true);

      try {
        
        const res = await api.get(customerId);

        if (res.status === 200) {

          setSuccess(true);
            
          dispatch({
            type: CUSTOMER.AUTHED, 
            payload: { 
              token: customerToken, 
              customer: res.body.data, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

          messageCount(customerToken);

          newMessage(customerToken, res.body.data.user.id);

        } else if (res.status === 401) {

          unsetAuth();

        } else {
          throw new Error();
        }
        
      } catch (error) {
        setError(NetworkErrorCodes.UNKNOWN_ERROR);
      } finally {
        setLoading(false);
      }
    },
    [api, loading, customerId, customerToken, dispatch, unsetAuth, messageCount, newMessage]
  );
  
  return [customerId, fetch, success, error];
}
