import { useState, useMemo } from 'react';
import CustomerRepository from '../../repositories/CustomerRepository';
import { useAppContext } from '../contextHook';
import { useUpdatePasswordValidation } from '../passwordValidationHook';

export function useCustomerPasswordUpdate() {

  const { 
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [newPasswordError, setNewPasswordError] = useState('');

  const [currentPasswordError, setCurrentPasswordError] = useState('');

  const validator = useUpdatePasswordValidation();

  const api = useMemo(function() { return new CustomerRepository(customerToken); }, [customerToken]);

  async function onSubmit(
    currentPassword,
    newPassword,
    currentPasswordValidity,
    newPasswordValidity
  ) {

    if (loading) return;

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError('');
    setFormSuccess('');

    const [
      error, 
      currentPasswordError, 
      newPasswordError
    ] = validator(currentPasswordValidity, newPasswordValidity);

    setNewPasswordError(newPasswordError);
    setCurrentPasswordError(currentPasswordError);

    if (error) return;

    setLoading(true);

    try {

      const res = await api.updatePassword(customer.id, {
        password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPassword
      });

      if (res.status === 200) {

        setFormSuccess(res.body.message);

      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'password':
              setCurrentPasswordError(error.message);
              break;

            case 'new_password':
              setNewPasswordError(error.message);
              break;

            default:
          }
        }

      } else {
        throw new Error();
      }

    } catch (error) {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [onSubmit, loading, formError, formSuccess, newPasswordError, currentPasswordError];
}
