
import React from 'react';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useOrderFetch } from '../../hooks/order/orderFetchHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';
import { useAppContext } from '../../hooks/contextHook';
import OrderProfile from '../../components/profile/OrderProfile';
import { useHeader } from '../../hooks/headerHook';

export default function Order() {

  const {
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  const [
    order, 
    orderFetchStatus, 
    refetch
  ] = useOrderFetch(deliveryFirmToken);
  
  useHeader({ 
    title: `${order?.number ?? 'Loading...'} - Order`,
    headerTitle: "_order.Order"
  });

  return (
    <section>
      {
        useRenderOnDataFetched(
          orderFetchStatus,
          ()=> <OrderProfile order={order} isDeliveryFirm={true} />,
          ()=> <div className="container-x"> <Loading /> </div>,
          ()=> <div className="container-x"> <Reload action={refetch} /> </div>,
          ()=> <div className="container-x"> <NotFound /> </div>,
          ()=> <div className="container-x"> <Forbidden /> </div>,
        )
      }
    </section>
  );
}


