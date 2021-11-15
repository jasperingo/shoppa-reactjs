
import React from 'react';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import UpdatePassword from '../../components/UpdatePassword';

export default function Profile() {


  function updateProfile(e) {
    e.preventDefault();
  }

  function updatePassword(e) {
    
  }

  return (
    <section className="flex-grow">
      
      <div className="container-x">

        <form method="POST" action="" className="form-1-x" onSubmit={updateProfile}>

          <FormField 
            ID="fn-input" 
            label="First_name" 
            />

          <FormField 
            ID="ln-input" 
            label="Last_name" 
            />

          <FormField
            ID="email-input" 
            label="Email" 
            type="email"
            />
          
          <FormField
            ID="phone-input" 
            label="_user.Phone_number" 
            type="tel"
            />

          <FormButton text="_extra.Submit" />

        </form>

        <UpdatePassword onUpdatePassword={updatePassword} />

      </div>

    </section>
  );
}
