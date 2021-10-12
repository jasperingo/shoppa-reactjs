
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import UserAccount from '../pages/UserAccount';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import TermsOfService from '../pages/TermsOfService';
import Categories from '../pages/Categories';
import Search from '../pages/Search';
import SearchHistory from '../pages/SearchHistory';
import Register from '../pages/Register';
import Store from '../pages/Store';
import Product from '../pages/Product';

export default function CustomerApp() {
  
  return (
    <>
      <Header />
      <main className="pb-20">
        <Switch>
          <Route path="/store/:sID/product/:pID">
            <Product />
          </Route>
          <Route path="/store/:ID">
            <Store />
          </Route>
          <Route path="/terms-of-service">    
            <TermsOfService />
          </Route>
          <Route path="/contact-us">    
            <ContactUs />
          </Route>
          <Route path="/about-us">    
            <AboutUs />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/search/history">
            <SearchHistory />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/account">
            <UserAccount />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

