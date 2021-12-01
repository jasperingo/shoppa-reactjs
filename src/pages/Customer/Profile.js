
import React, { useEffect, useRef, useState } from 'react';
import apiUpdate from '../../api/user/apiUpdate';
import AlertDialog, { LOADING_DIALOG } from '../../components/AlertDialog';
import FormButton from '../../components/FormButton';
import FormMessage from '../../components/FormMessage';
import FormField from '../../components/FormField';
import PhotoChooser from '../../components/PhotoChooser';
import UpdatePassword from '../../components/UpdatePassword';
import { FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useAuthHTTPHeader } from '../../context/AppHooks';

export default function Profile() {

  const { user: { 
    user,
    userResponse,
    userFetchStatus 
  }, userDispatch } = useAppContext();

  const firstNameInput = useRef(null);

  const lastNameInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);
  
  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [firstNameError, setFirstNameError] = useState('');

  const [lastNameError, setLastNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const headers = useAuthHTTPHeader();


  function updateProfile(e) {
    e.preventDefault();

    let error = false;

    setFormError('');

    setFormSuccess('');
    
    if (!firstNameInput.current.validity.valid) {
      error = true;
      setFirstNameError('_errors.This_field_is_required');
    } else {
      setFirstNameError('');
    }

    if (!lastNameInput.current.validity.valid) {
      error = true;
      setLastNameError('_errors.This_field_is_required');
    } else {
      setLastNameError('');
    }

    if (!emailInput.current.validity.valid) {
      error = true;
      setEmailError('_errors.This_field_is_required');
    } else {
      setEmailError('');
    }

    if (!phoneInput.current.validity.valid) {
      error = true;
      setPhoneError('_errors.This_field_is_required');
    } else {
      setPhoneError('');
    }
    
    if (!error) {

      userDispatch({
        type: USER.FETCH_STATUS_CHANGED,
        payload: FETCH_STATUSES.LOADING
      });
      
      setDialog(LOADING_DIALOG);
    }
  }

  function updatePassword(e) {
    
  }

  useEffect(()=> {

    if (userFetchStatus === FETCH_STATUSES.LOADING) {
      apiUpdate(
        userDispatch, 
        'post/auth-customer.json', 
        {
          first_name: firstNameInput.current.value,
          last_name: lastNameInput.current.value,
          email: emailInput.current.value,
          phone_number: phoneInput.current.value
        }, 
        headers
      );
    } else if (dialog !== null) {
      setDialog(null);
    }

    if (userFetchStatus === FETCH_STATUSES.ERROR) {
      setFormError(userResponse.errors.form);
      setFirstNameError(userResponse.errors.first_name);
      setLastNameError(userResponse.errors.first_name);
      setEmailError(userResponse.errors.email);
      setPhoneError(userResponse.errors.phone_number);
    } else if (userFetchStatus === FETCH_STATUSES.DONE) {
      setFormSuccess(userResponse.success);
    }

  }, [userResponse, userFetchStatus, dialog, userDispatch, headers]);

  return (
    <section className="flex-grow">
      
      <div className="container-x">

        <form method="POST" action="" className="form-1-x" onSubmit={updateProfile}>

          { 
            (formError || formSuccess) && 
            <FormMessage 
              text={formSuccess ? formSuccess : formError} 
              type={formSuccess ? FormMessage.TYPE_SUCCESS : FormMessage.TYPE_ERROR} 
              /> 
          }

          <PhotoChooser src={`/photos/${user.photo}`} text="_extra.Edit_photo" />

          <FormField 
            ref={firstNameInput}
            error={firstNameError}
            ID="fn-input" 
            label="_user.First_name" 
            required={true}
            value={ user.first_name }
            />

          <FormField 
            ref={lastNameInput}
            error={lastNameError}
            ID="ln-input" 
            label="_user.Last_name" 
            required={true}
            value={ user.last_name }
            />

          <FormField 
            ref={emailInput}
            error={emailError}
            ID="email-input" 
            label="_user.Email" 
            type="email" 
            required={true}
            value={ user.email }
            />

          <FormField
            ref={phoneInput}
            error={phoneError}
            ID="phone-input" 
            label="_user.Phone_number" 
            type="tel"
            value={ user.phone_number }
            required={false}
            />

          <FormButton text="_extra.Submit" />

        </form>

        <UpdatePassword onUpdatePassword={updatePassword} />

      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

    </section>
  );
}
