
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import apiAuthUser from '../../api/user/apiAuthUser';
import AlertDialog, { LOADING_DIALOG } from '../../components/AlertDialog';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import FormMessage from '../../components/FormMessage';
import SocialLoginList from '../../components/SocialLoginList';
import { FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';

export default function Login({ guestMiddleware }) {

  const { t } = useTranslation();

  const { user: { 
    userResponse,
    userFetchStatus
  }, userDispatch } = useAppContext();

  const emailInput = useRef(null);

  const passwordInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');
  
  function onLoginSubmit(e) {
    e.preventDefault();

    if (!emailInput.current.validity.valid || !passwordInput.current.validity.valid) {
      setFormError('_errors.Credentials_are_incorrect');
    } else {
      setFormError('');
      
      userDispatch({
        type: USER.FETCH_STATUS_CHANGED,
        payload: FETCH_STATUSES.LOADING
      });
      
      setDialog(LOADING_DIALOG);
    }

  }

  useEffect(()=> {

    if (userFetchStatus === FETCH_STATUSES.LOADING) {
      apiAuthUser(userDispatch, 'post/auth-customer.json', {
        email: emailInput.current.value,
        password: passwordInput.current.value,
        confirm_password: passwordInput.current.value
      });
    } else if (dialog !== null) {
      setDialog(null);
    }

    if (userFetchStatus === FETCH_STATUSES.ERROR) {
      setFormError(userResponse.errors.form);
    }

  }, [userResponse, userFetchStatus, userDispatch, dialog]);
  
  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onLoginSubmit} className="form-1-x" noValidate>

          { formError && <FormMessage text={formError} /> }

          <FormField 
            ref={emailInput} 
            ID="email-input" 
            label="_user.Email" 
            type="email"
            required={true}
            />

          <FormField 
            ref={passwordInput}
            ID="password-input" 
            label="_user.Password" 
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

          <SocialLoginList href="/login" />

        </form>

      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

    </section>
  );
}


