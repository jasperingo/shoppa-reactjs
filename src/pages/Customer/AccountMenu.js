
import React from 'react';
import { Redirect, Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import AppSwitch from '../../AppSwitch';
import { cartIcon, favoritedIcon, locationIcon, orderIcon, transactionIcon, userIcon } from '../../assets/icons';
import AccountMenuList from '../../components/AccountMenuList';
import AccountMenuTop from '../../components/AccountMenuTop';
import DualPaneIntro from '../../components/DualPaneIntro';
import { useAppContext } from '../../context/AppContext';
import Address from './Address';
import Addresses from './Addresses';
import Favourites from './Favourites';
import Order from './Order';
import Orders from './Orders';
import Profile from './Profile';
import SavedCarts from './SavedCarts';
import Transactions from './Transactions';


const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/account/profile'},
  { text: '_order.Orders', icon: orderIcon, href: '/account/orders'},
  { text: '_extra.Favorites', icon: favoritedIcon, href: '/account/favorites'},
  { text: '_cart.Saved_carts', icon: cartIcon, href: '/account/saved-carts'},
  { text: '_user.Addresses', icon: locationIcon, href: '/account/addresses'},
  { text: '_transaction.Transactions', icon: transactionIcon, href: '/account/transactions'},
];

export default function UserAccount() {

  const match = useRouteMatch();

  const location = useLocation();

  const { customer } = useAppContext();

  if (customer === 10) {
    return (<Redirect to="/login" />)
  }

  return (
    <section>
      <div className="container-x">
        
        <div className="lg:flex lg:gap-5">
          <div className={`${location.pathname !== '/account' && 'hidden'} lg:block`}>
            <AccountMenuTop photo="user.jpg" name="Paul Johnson" />
            <AccountMenuList items={MENU_ITEMS} />
            
            <AppSwitch />
          </div>

          <Switch>
            <Route path={`${match.url}/transactions`} render={()=> <Transactions />} />
            <Route path={`${match.url}/orders`} render={()=> <Orders />} />
            <Route path={`${match.url}/order/:ID`} render={()=> <Order />} />
            <Route path={`${match.url}/saved-carts`} render={()=> <SavedCarts />} />
            <Route path={`${match.url}/favorites`} render={()=> <Favourites />} />
            <Route path={`${match.url}/address/:ID`} render={()=> <Address />} />
            <Route path={`${match.url}/addresses`} render={()=> <Addresses />} />
            <Route path={`${match.url}/profile`} render={()=> <Profile />} />
            <Route 
              path={match.url} 
              render={()=> <DualPaneIntro icon={userIcon} text="_user.Manage_your_account" />}
              />
          </Switch>
        </div>

      </div>
    </section>
  );
}

