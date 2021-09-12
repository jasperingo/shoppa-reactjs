
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import SearchForm from './SearchForm';
import HomeIcon from '../icons/HomeIcon';
import UserIcon from '../icons/UserIcon';
import CartIcon from '../icons/CartIcon';
import CategoriesIcon from '../icons/CategoriesIcon';
//import { useAppContext } from '../context/AppContext';


const NAV_LINKS = [
  { title : 'home', icon: HomeIcon, href: '/' },
  { title : 'categories', icon: CategoriesIcon, href: '/categories' },
  { title : 'cart', icon: CartIcon, href: '/cart' },
  { title : 'account', icon: UserIcon, href: '/login' }
];

function NavItem({ id, title, active, Icon, href, onNavItemClicked }) {
  return (
    <li className="flex-1 text-center">
      <Link to={ href } className={"bg-white hover:bg-gray-200 block width-full p-3 text-sm"+
      (active ? ' text-yellow-500': ' text-gray-500')} onClick={ () => onNavItemClicked(id) }>
        <Icon />
        <span>{ title }</span>
      </Link>
    </li>
  );
}

export default function Header() {

  const { t } = useTranslation();

  const [activeNavLink, setActiveNavLink] = useState(0);

  //const { cartItems } = useAppContext();

  const navItems = NAV_LINKS.map((item, i) => (
    <NavItem 
      key={i}
      id={i}
      title={t(item.title)} 
      active={i===activeNavLink} 
      Icon={item.icon} 
      href={item.href}
      onNavItemClicked={setActiveNavLink}  />
  ));
  
  return (
    <header className="bg-white px-2 py-4 border-b">
      <div className="flex">
        <h1 className="text-2xl font-bold text-yellow-500 flex-grow" id="ll">{ t('app_name') }</h1>
        <SearchForm />
        <nav className="fixed left-0 bottom-0 w-full border-t">
          <ul className="flex">
            { navItems }
          </ul>
        </nav>
      </div>
    </header>
  );
}

