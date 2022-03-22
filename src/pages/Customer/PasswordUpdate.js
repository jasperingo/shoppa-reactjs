
import React from 'react';
import PasswordUpdateForm from '../../components/form/PasswordUpdateForm';
import { useCustomerPasswordUpdate } from '../../hooks/customer/customerPasswordUpdateHook';
import { useHeader } from '../../hooks/headerHook';

export default function PasswordUpdate() {

  useHeader({ 
    title: 'Update - Password',
    headerTitle: '_user.Edit_password'
  });

  const [
    onSubmit,
    loading, 
    formError, 
    formSuccess, 
    newPasswordError, 
    currentPasswordError
  ] = useCustomerPasswordUpdate();

  return (
    <section>
      <div className="container-x">
        <PasswordUpdateForm 
          dialog={loading}
          onSubmit={onSubmit}
          formError={formError} 
          formSuccess={formSuccess}
          newPasswordError={newPasswordError}
          currentPasswordError={currentPasswordError}
          />
      </div>
    </section>
  );
}
