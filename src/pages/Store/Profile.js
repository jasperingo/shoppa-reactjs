
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserApi from '../../api/UserApi';
import AlertDialog, { LOADING_DIALOG } from '../../components/AlertDialog';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import FormMessage from '../../components/FormMessage';
import FormSelect from '../../components/FormSelect';
import PhotoChooser from '../../components/PhotoChooser';
import UpdateAddressForm from '../../components/UpdateAddressForm';
import UpdatePassword from '../../components/UpdatePassword';
import UpdateWithdrawalAccountForm from '../../components/UpdateWithdrawalAccountForm';
import { FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';

export default function Profile() {

  const { t } = useTranslation();

  const { user: { user }, userDispatch } = useAppContext();

  const nameInput = useRef(null);

  const categoryInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);
  
  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [nameError, setNameError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const [photoFetchStatus, setPhotoFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function updateProfile(e) {
    e.preventDefault();

    let error = false;

    setFormError('');

    setFormSuccess('');

    setFetchStatus(FETCH_STATUSES.PENDING);

    setPhotoFetchStatus(FETCH_STATUSES.PENDING);
    
    if (!nameInput.current.validity.valid) {
      error = true;
      setNameError('_errors.This_field_is_required');
    } else {
      setNameError('');
    }

    if (!categoryInput.current.validity.valid) {
      error = true;
      setCategoryError('_errors.This_field_is_required');
    } else {
      setCategoryError('');
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
      setFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  function onPhotoSuccess(res) {

    setPhotoFetchStatus(FETCH_STATUSES.DONE);

    if (res !== null) {
      setFormSuccess(res.msg);
      userDispatch({ type: USER.UPDATED, payload: res });
    }
  }

  function onPhotoError(err) {
    
    setFetchStatus(FETCH_STATUSES.ERROR);

    if (err.errors) {
      setFormError(err.errors.form);
    } else {
      setFormSuccess('_errors.Something_went_wrong');
    }
  }

  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {
      
      const api = new UserApi(user.api_token);
      api.updateStore({
        name: nameInput.current.value,
        category: categoryInput.current.value,
        email: emailInput.current.value,
        phone_number: phoneInput.current.value
      }).then(res=> {
        
        setFormSuccess(res.msg);
        setFetchStatus(FETCH_STATUSES.DONE);
        userDispatch({ type: USER.UPDATED, payload: res });

      }).catch(err=> {

        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFormError(err.errors.form);
          setNameError(err.errors.name);
          setCategoryError(err.errors.category);
          setEmailError(err.errors.email);
          setPhoneError(err.errors.phone_number);
        } else {
          setFormError('_errors.Something_went_wrong');
        }

      });

    } else if(fetchStatus === FETCH_STATUSES.DONE && photoFetchStatus === FETCH_STATUSES.PENDING) {
      setPhotoFetchStatus(FETCH_STATUSES.LOADING);
    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [t, user, fetchStatus, photoFetchStatus, dialog, userDispatch]);

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

          <PhotoChooser 
            url="post/auth-customer.json"
            src={`/photos/${user.photo}`} 
            text="_extra.Edit_photo" 
            status={photoFetchStatus}
            onSuccess={onPhotoSuccess}
            onError={onPhotoError}
            />

          <FormField 
            ref={nameInput}
            error={nameError}
            ID="name-input" 
            label="_user.Name" 
            required={true}
            value={ user.name }
            />

          <FormSelect 
            ref={categoryInput}
            error={categoryError}
            ID="category-input"
            label="_store.Store_category" 
            required={true}
            value={ user.category }
            options={[
              'Phamarcy'
            ]}
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
            required={true}
            value={ user.phone_number }
            />

          <FormButton text="_user.Update_profile" />

        </form>

        <UpdateAddressForm address={user.address} />

        <UpdateWithdrawalAccountForm 
          url="success.json"
          account={ user.account }
          />

        <UpdatePassword url="success.json" />

      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

    </section>
  );
}

