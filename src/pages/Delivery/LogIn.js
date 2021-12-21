
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useRef } from 'react/cjs/react.development';
import DeliveryFirmApi from '../../api/DeliveryFirmApi';
import { deliveryIcon } from '../../assets/icons';
import { LOADING_DIALOG } from '../../components/AlertDialog';
import AuthFormHeader from '../../components/AuthFormHeader';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import FormMessage from '../../components/FormMessage';
import { ADDRESS, FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';

export default function LogIn({ guestMiddleware }) {

  const { t } = useTranslation();

  const { userDispatch, addressesDispatch } = useAppContext();

  const emailInput = useRef(null);

  const passwordInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  
  function onLoginSubmit(e) {
    e.preventDefault();

    if (!emailInput.current.validity.valid || !passwordInput.current.validity.valid) {
      setFormError('_errors.Credentials_are_incorrect');
    } else {
      setFormError('');
      setFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {
      
      const api = new DeliveryFirmApi();
      api.auth({
        email: emailInput.current.value,
        password: passwordInput.current.value,
        confirm_password: passwordInput.current.value
      }).then(res=> {
        userDispatch({ type: USER.AUTHED, payload: res.data });
        addressesDispatch({ type: ADDRESS.FETCHED, payload: res.data.address });
      }).catch(err=> {

        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFormError(err.errors.msg);
        } else {
          setFormError('_errors.Something_went_wrong');
        }
      });

    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [fetchStatus, dialog, userDispatch, addressesDispatch]);

  
  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onLoginSubmit} className="form-1-x" noValidate>

          <AuthFormHeader icon={deliveryIcon} text="_user.Welcome_back" />

          { formError && <FormMessage text={formError} /> }

          <FormField
            ref={emailInput} 
            ID="email-input" 
            label="Email" 
            type="email"
            required={true}
            />

          <FormField 
            ref={passwordInput}
            ID="password-input" 
            label="Password" 
            type="password" 
            required={true}
            minLength={6}
            />

          <div className="mb-4 text-sm">
            <Link to="/forgot-password" className="text-blue-500 font-bold">{ t('Forgot_your_password') }</Link>
          </div>

          <FormButton text="_user.Log_in" />

          <div className="mb-4 text-center text-sm">
            <span>{ t('Dont_have_an_account') } </span>
            <Link to="/register" className="text-blue-500 font-bold">{ t('Register') }</Link>
          </div>

        </form>

      </div>
    </section>
  );
}

