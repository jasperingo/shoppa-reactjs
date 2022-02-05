
import React from 'react';
import { storeIcon } from '../../assets/icons';
import AuthFormHeader from '../../components/AuthFormHeader';


export default function LogIn({ guestMiddleware }) {

  // const { t } = useTranslation();

  // const { userDispatch, addressesDispatch } = useAppContext();

  // const emailInput = useRef(null);

  // const passwordInput = useRef(null);

  // const [dialog, setDialog] = useState(null);

  // const [formError, setFormError] = useState('');

  // const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  
  function onLoginSubmit(e) {
    e.preventDefault();
    
  //   if (!emailInput.current.validity.valid || !passwordInput.current.validity.valid) {
  //     setFormError('_errors.Credentials_are_incorrect');
  //   } else {
  //     setFormError('');
  //     setFetchStatus(FETCH_STATUSES.LOADING);
  //     setDialog(LOADING_DIALOG);
  //   }
  }

  // useEffect(()=> {

  //   if (fetchStatus === FETCH_STATUSES.LOADING) {
      
  //     const api = new StoreApi();
  //     api.auth({
  //       email: emailInput.current.value,
  //       password: passwordInput.current.value,
  //       confirm_password: passwordInput.current.value
  //     }).then(res=> {
  //       res.data.TYPE = User.TYPE_STORE;
  //       userDispatch({ type: USER.AUTHED, payload: res.data });
  //     }).catch(err=> {

  //       setFetchStatus(FETCH_STATUSES.ERROR);

  //       if (err.errors) {
  //         setFormError(err.errors.msg);
  //       } else {
  //         setFormError('_errors.Something_went_wrong');
  //       }
  //     });

  //   } else if (dialog !== null) {
  //     setDialog(null);
  //   }

  // }, [fetchStatus, dialog, userDispatch, addressesDispatch]);

  
  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onLoginSubmit} className="form-1-x" noValidate>

          <AuthFormHeader icon={storeIcon} text="_user.Welcome_back" />

          {/* { formError && <FormMessage text={formError} /> }

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
          </div> */}

        </form>

      </div>
    </section>
  );
}

