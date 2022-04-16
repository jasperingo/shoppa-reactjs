
import { useMemo, useState } from "react";
import DeliveryRouteRepository from "../../repositories/DeliveryRouteRepository";
import { useAppContext } from "../contextHook";
import { useDeliveryRouteValidation } from "./deliveryRouteValidationHook";

export function useDeliveryRouteCreate() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    }
  } = useAppContext();

  const [id, setId] = useState(0);

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');

  const [doorDeliveryError, setDoorDeliveryError] = useState('');

  const validator = useDeliveryRouteValidation();

  const api = useMemo(function() { return new DeliveryRouteRepository(deliveryFirmToken); }, [deliveryFirmToken]);

  async function onSubmit(name, door_delivery, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    
    const [error,  nameError, doorDelivevryError] = validator(validity);
    
    setNameError(nameError);
    setDoorDeliveryError(doorDelivevryError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.create({ name, door_delivery });

      if (res.status === 201) {
        
        setFormSuccess(res.body.message);
        
        setId(res.body.data.id);
        
      } else if (res.status === 400) {

        for (let error of res.body.data) {

          switch(error.name) {

            case 'name':
              setNameError(error.message);
              break;

            case 'door_delivery':
              setDoorDeliveryError(error.message);
              break;

            default:
          }
        }

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
    id, 
    loading, 
    formError, 
    formSuccess, 
    nameError,
    doorDeliveryError
  ];
}
