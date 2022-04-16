
import { useMemo, useState } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteWeightRepository from "../../repositories/DeliveryRouteWeightRepository";
import { useAppContext } from "../contextHook";

export function useDeliveryRouteWeightDelete() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    },
    deliveryRoute : { 
      deliveryRouteDispatch,
      deliveryRoute: {
        deliveryWeight
      } 
    }
  } = useAppContext();

  const [loading, setLoading] = useState(null);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new DeliveryRouteWeightRepository(deliveryFirmToken); }, [deliveryFirmToken]);

  async function onSubmit() {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    setLoading(true);

    try {
      
      const res = await api.delete(deliveryWeight.id);

      if (res.status === 200) {

        setFormSuccess(res.body.message);

        deliveryRouteDispatch({ 
          type: DELIVERY_ROUTE.WEIGHT_DELETED,
          payload: { id: deliveryWeight.id }
        });
        
      } else if (res.status === 400) {

        setFormError(res.body.data[0].message);

      } else {
        throw new Error();
      }
      
    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [
    onSubmit, 
    loading, 
    formSuccess,
    formError
  ];
}
