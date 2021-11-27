
import Icon from '@mdi/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import CustomerApp from '../apps/CustomerApp';
import StoreApp from '../apps/StoreApp';
import { dateIcon, editIcon, productIcon, storeIcon } from '../assets/icons';
import { FETCH_STATUSES, PRODUCT } from '../context/AppActions';
import { API_URL, useAppContext } from '../context/AppContext';
import { useDateFormat, useHasMoreToFetchViaScroll, useListRender, useMoneyFormat } from '../context/AppHooks';
import EmptyList from './EmptyList';
import FetchMoreButton from './FetchMoreButton';
import Loading from './Loading';
import ProductItem from './ProductItem';
import Reload from './Reload';

const getProductsFetchStatusAction = (payload) => ({
  type: PRODUCT.LIST_FETCH_STATUS_CHANGED,
  payload
});

export default function PromotionView({ appType, promotion: { id, store, title, number_of_products, deduction_amount, deduction_percent, start_time, stop_time } }) {

  const { t } = useTranslation();

  const amount = useMoneyFormat(deduction_amount || -1);

  const { promotions: {
    products: {
      products,
      productsFetchStatus,
      productsPage,
      productsNumberOfPages
    }
  }, promotionsDispatch } = useAppContext();


  useEffect(()=> {
    
    async function fetchProducts() {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}store-products.json?id=${id}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        promotionsDispatch({
          type: PRODUCT.LIST_FETCHED,
          payload: {
            products: data.data,
            productsNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        promotionsDispatch(getProductsFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchProducts();

  }, [id, productsFetchStatus, promotionsDispatch]);

  function refetchProducts() {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    promotionsDispatch(getProductsFetchStatusAction(FETCH_STATUSES.LOADING));
  }


  return (
    <>
      <div className="container-x">
        <div className="py-4">
          <h3 className="font-bold text-2xl mb-1">{ title }</h3>
          <div className="bg-color-primary px-3 py-1 rounded-3xl inline-block mb-1">
            { (deduction_amount && <>- {amount}</>) || (deduction_percent && `- ${deduction_percent}%`) }
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 items-center">
            <div className="flex items-center gap-1">
              <Icon path={dateIcon} className="w-5 h-5" />
              <span>{ t('_extra.Start') }: </span> 
              <span>{ useDateFormat(start_time) }</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon path={dateIcon} className="w-5 h-5" />
              <span>{ t('_extra.End') }: </span>
              <span>{ useDateFormat(stop_time) }</span> 
            </div>
          </div>

          {
            appType === CustomerApp.TYPE && 
            <div className="my-2">
              <div className="text-sm font-bold">{ t('_store.Store') }</div>
              <Link to={`/store/${store.id}/products`} className="flex gap-1 items-center">
                <Icon path={storeIcon} className="text-color-primary w-8 h-8" />
                <div>{ store.name }</div>
              </Link>
            </div>
          }

          {
            appType === StoreApp.TYPE && 
            <div className="my-2">
              <Link to={`/promotion/add`} className="inline-flex gap-1 items-center py-1 px-2 rounded btn-color-primary">
                <Icon path={editIcon} className="w-5 h-5" />
                <div>{ t('_extra.Edit') }</div>
              </Link>
            </div>
          }

        </div>
      </div>
      <div className="container-x">
        <h4 className="font-bold text-xl text-color-gray mb-1">{ t('_product.product__Count', { count: number_of_products }) }</h4>
        
        <InfiniteScroll
          dataLength={products.length}
          next={refetchProducts}
          hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
          >
          <ul className="list-x">
            { 
              useListRender(
                products, 
                productsFetchStatus,
                (item, i)=> <li key={`prod-${i}`}> <ProductItem prod={item} /> </li>, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchProducts} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_product" Icon={productIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchProducts} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div>
    </>
  );
}
