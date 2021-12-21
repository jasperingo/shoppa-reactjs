
import Icon from '@mdi/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CustomerApp from '../apps/CustomerApp';
import { editIcon } from '../assets/icons';

export default function  AddressItem({ appType, address: { id, title, street, city, state, default_address } }) {

  const { t } = useTranslation();

  return (
    <li>
      <div className="border rounded mb-4">
        <div className="p-2">
          <div className="py-2 font-bold">{ title }</div>
          <div>{ street }</div>
          <div>{ city }</div>
          <div>{ state }</div>
        </div>
        <div className="flex gap-4 p-2 border-t">

          <div className={`${default_address ? 'text-color-primary' : 'text-color-gray'} flex-grow`}>
            { default_address ? t('_user.Default_address') : t('_extra.Not_default') }
          </div>

          {
            appType === CustomerApp.TYPE && 
            <Link to={`/address/${id}`} className="flex gap-1 items-center text-color-primary">
              <Icon path={editIcon} className="w-5 h-5 text-color-primary" />
              <span>{ t('_extra.Edit') }</span>
            </Link>
          }

        </div>
      </div>
    </li>
  );
}
