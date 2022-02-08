
import React, { useRef } from 'react';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import ForgotPasswordLink from '../../components/form/ForgotPasswordLink';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import RegisterIfNoAccountLink from '../../components/form/RegisterIfNoAccountLink';
import SocialLoginList from '../../components/SocialLoginList';
import { useCustomerLogin } from '../../hooks/customerHook';
import { useHeader } from '../../hooks/headerHook';

export default function LogIn({ guestMiddleware }) {

  useHeader({ 
    title: 'Log In - DailyNeeds',
    headerTitle: '_user.Log_in'
  });

  const emailInput = useRef(null);

  const passwordInput = useRef(null);

  const [onSubmit, dialog, formError] = useCustomerLogin();
  
  function onLoginSubmit(e) {
    e.preventDefault();
    onSubmit(
      emailInput.current.value,
      passwordInput.current.value,
      emailInput.current.validity,
      passwordInput.current.validity,
    );
  }

  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onLoginSubmit} className="form-1-x" noValidate>

          <FormMessage error={formError} />

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

          <ForgotPasswordLink />

          <FormButton text="_user.Log_in" />

          <RegisterIfNoAccountLink />

          <SocialLoginList href="/login" />

        </form>

      </div>

      { dialog && <LoadingDialog /> }

    </section>
  );
}


