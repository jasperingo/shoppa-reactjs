
import { useCallback, useMemo } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DeliveryRouteWeightRepository from "../../repositories/DeliveryRouteWeightRepository";
import { useAppContext } from "../contextHook";

export function useDeliveryRouteWeightFetch(userToken) {

  const { 
    deliveryRoute : { 
      deliveryRouteDispatch,
      deliveryRoute: {
        deliveryWeight,
        deliveryWeightID,
        deliveryWeightLoading,
        deliveryWeightError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DeliveryRouteWeightRepository(userToken); }, [userToken]);

  const unfetchDeliveryWeight = useCallback(
    function() { deliveryRouteDispatch({ type: DELIVERY_ROUTE.WEIGHT_UNFETCHED }); },
    [deliveryRouteDispatch]
  );
  
  const fetchDeliveryWeight = useCallback(
    async function(ID) {

      if (deliveryWeightLoading) return;

      if (!window.navigator.onLine) {
        deliveryRouteDispatch({
          type: DELIVERY_ROUTE.WEIGHT_ERROR_CHANGED,
          payload: { 
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION 
          }
        });
        return;
      } 

      deliveryRouteDispatch({ type: DELIVERY_ROUTE.WEIGHT_FETCHING });

      try {

        const res = await api.get(ID);
          
        if (res.status === 200) {

          deliveryRouteDispatch({
            type: DELIVERY_ROUTE.WEIGHT_FETCHED, 
            payload: {
              id: ID,
              deliveryWeight: res.body.data, 
            }
          });

        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }

      } catch(error) {
        deliveryRouteDispatch({
          type: DELIVERY_ROUTE.WEIGHT_ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, deliveryWeightLoading, deliveryRouteDispatch]
  );

  return [
    fetchDeliveryWeight,
    deliveryWeight,
    deliveryWeightLoading,
    deliveryWeightError,
    deliveryWeightID,
    unfetchDeliveryWeight
  ];
}
