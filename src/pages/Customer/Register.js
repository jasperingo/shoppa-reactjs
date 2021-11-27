
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import SocialLoginList from '../../components/SocialLoginList';

export default function Register() {

  const { t } = useTranslation();

  function onRegisterSubmit(e) {
    e.preventDefault();
  }

  function jj(params) {
    
  }
  
  return (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onRegisterSubmit} className="form-1-x">

          <FormField ID="fn-input" label="_user.First_name" onInputChanged={jj} />

          <FormField ID="ln-input" label="_user.Last_name" onInputChanged={jj} />

          <FormField ID="email-input" label="_user.Email" type="email" onInputChanged={jj} />

          <FormField ID="password-input" label="_user.Password" type="password" onInputChanged={jj} />

          <div className="mb-4 text-sm">
            <span>{ t('By_registering_you_agree_to_our') }</span>
            <Link to="/terms-of-service" className="text-blue-500 font-bold"> { t('_extra.Terms_of_service') }.</Link>
          </div>

          <FormButton text="Register" />

          <div className="mb-4 text-center text-sm">
            <span>{ t('Already_have_an_account') } </span>
            <Link to="/login" className="text-blue-500 font-bold">{ t('login') }</Link>
          </div>

          <SocialLoginList href="/login" />

        </form>
        
      </div>
      
    </section>
  );
}

