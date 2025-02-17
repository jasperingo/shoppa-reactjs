
import React from 'react';
import { checkIcon, dateIcon, editIcon, emailIcon, messageIcon, phoneIcon } from '../../assets/icons';
import { useDateFormatter } from '../../hooks/viewHook';
import Tab from '../Tab';
import ProfileDetails from './ProfileDetails';
import ProfileHeader from './ProfileHeader';

export default function CustomerProfile(
  { 
    navLinks, 
    isAdmin,
    customer 
  }
) {

  const dateFormat = useDateFormatter();

  const details = [
    {
      icon: phoneIcon,
      data: customer.user.phone_number
    },
    {
      icon: dateIcon,
      data: dateFormat(customer.user.created_at)
    }
  ];

  if (isAdmin) {
    details.push(
      {
        icon: emailIcon,
        data: customer.user.email
      },
      {
        icon: checkIcon,
        data: customer.user.status
      }
    );
  }
  
  return (
    <div>
      <ProfileHeader
        photo={customer.user.photo.href}
        name={customer.user.name}
        links={[
          {
            href: `/messages/${customer.user.id}`,
            title: '_message.Message',
            icon: messageIcon
          },
          {
            href: `/customer/${customer.id}/update`,
            title: '_extra.Edit',
            icon: editIcon
          }
        ]}
        />

      <ProfileDetails details={details} />

      <Tab items={navLinks} />
    </div>
  );
}

