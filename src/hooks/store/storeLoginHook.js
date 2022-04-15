import { useMemo, useState } from "react";
import { STORE } from "../../context/actions/storeActions";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useMessageFetch } from "../message/messageFetchHook";
import { useMessageUnreceivedCountFetch } from "../message/messageUnreceivedCountFetchHook";
import { useStoreAuthSet } from "./storeAuthStorageHook";

export function useStoreLogin() {

  const { 
    store: { storeDispatch } 
  } = useAppContext();
  
  const newMessage = useMessageFetch();

  const messageCount = useMessageUnreceivedCountFetch();

  const setAuthToken = useStoreAuthSet();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState(null);

  const api = useMemo(function() { return new StoreRepository(); }, []);

  async function onSubmit(name, email, password, nameValidity, emailValidity, passwordValidity) {
    
    if (loading) return;

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    if (!nameValidity.valid || !emailValidity.valid || !passwordValidity.valid) {
      setFormError('_errors.Credentials_are_incorrect');
      return;
    }

    setLoading(true);

    setFormError(null);

    try {
      
      const res = await api.auth({
        name,
        administrator_email: email,
        administrator_password: password
      });
    
      if (res.status === 200) {

        setAuthToken(
          res.body.data.store.id, 
          res.body.data.api_token.token,
          res.body.data.store.administrators[0].id
        );
        
        storeDispatch({
          type: STORE.AUTHED, 
          payload: { 
            store: res.body.data.store, 
            token: res.body.data.api_token.token, 
            adminID: res.body.data.store.administrators[0].id
          }
        });

        messageCount(res.body.data.api_token.token);

        newMessage(res.body.data.api_token.token, res.body.data.store.user.id);

        setSuccess(true);
        
      } else if (res.status === 401 || res.status === 403) {
        setFormError(res.body.message);
      } else {
        throw new Error();
      }

    } catch {
      setFormError('_error.Something_went_wrong');
    } finally {
      setLoading(false);
    } 
  }

  return [onSubmit, loading, success, formError];
}

