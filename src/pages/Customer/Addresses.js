
import Icon from '@mdi/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { deleteIcon, editIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, USER_ADDRESS } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useListRender } from '../../context/AppHooks';

const getFetchStatusAction = (payload) => ({
  type: USER_ADDRESS.LIST_FETCH_STATUS_CHANGED,
  payload
});

function AddressItem({ address: { id, title, street, city, state, is_default } }) {

  const { t } = useTranslation();

  return (
    <li>
      <div className="border rounded mb-4">
        <div className="p-2">
          <div className="py-2 font-bold">{ title }</div>
          <div>{ street }</div>
          <div>{ city }</div>
          <div>{ state }</div>
        </div>
        <div className="flex gap-4 p-2 border-t">

          <button className={`${is_default ? 'text-color-gray' : 'text-color-primary'} flex-grow text-left`}>
            { is_default ? t('_user.Default_address') : t('_extra.Make_default') }
          </button>

          <Link to={`/account/address/${id}`}>
            <span className="sr-only">{ t('_extra.Edit') }</span>
            <Icon path={editIcon} classList="text-color-primary" />
          </Link>

          <button>
            <span className="sr-only">{ t('_extra.Delete') }</span>
            <Icon path={deleteIcon} classList="text-color-primary" />
          </button>
        </div>
      </div>
    </li>
  );
}

export default function Addresses() {

  const { customer: {
    addresses: {
      addresses,
      addressesFetchStatus
    }
  }, customerDispatch } = useAppContext();

  useEffect(()=> {

    async function fetchAddresses() {

      if (addressesFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}addresses.json`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        //data.data = [];

        customerDispatch({
          type: USER_ADDRESS.LIST_FETCHED,
          payload: data.data
        });
        
      } catch (err) {
        customerDispatch(getFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchAddresses(); 

  }, [addressesFetchStatus, customerDispatch]);

  function refetchAddresses() {
    if (addressesFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    customerDispatch(getFetchStatusAction(FETCH_STATUSES.LOADING));
  }


  return (
    <section className="flex-grow">
      
      <div className="container-x">

        <AddButton text="_user.Add_address" href="/account/address/add" />
        

        <ul className="list-2-x">
          { 
            useListRender(
              addresses, 
              addressesFetchStatus,
              (item, i)=> <AddressItem key={`addresses-${i}`} address={item} />,
              (k)=> <li key={k}> <Loading /> </li>, 
              (k)=> <li key={k}> <Reload action={refetchAddresses} /> </li>,
            )
          }
        </ul>

      </div>

    </section>
  );
}
