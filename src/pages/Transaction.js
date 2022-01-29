
import React from 'react';
import { useTranslation } from 'react-i18next';
import Forbidden from '../components/Forbidden';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import ProfileDetailsText from '../components/ProfileDetailsText';
import ProfileHeaderText from '../components/ProfileHeaderText';
import Reload from '../components/Reload';
import UserDescList from '../components/UserDescList';
import { useTransactionFetch } from '../hooks/transaction/transactionFetchHook';
import { useTransactionStatus, useTransactionType } from '../hooks/transaction/transactionViewHook';
import { useDateFormat, useMoneyFormat, useRenderOnDataFetched } from '../hooks/viewHook';


function Profile({ transaction: { id, application, reference, status, type, amount, created_at, user, order } }) {

  const { t } = useTranslation();

  const [theStatus] = useTransactionStatus(status);

  function onCancelClicked() {
    console.log('Cancel...')
  }

  function onProcessClicked() {
    console.log('Process...')
  }

  function onDeclineClicked() {
    console.log('Decline...')
  }

  return (
    <div>

      <ProfileHeaderText
        text={useMoneyFormat(amount)}
        buttons={[
          {
            text: '_extra.Process',
            color: 'btn-color-primary',
            action: onProcessClicked
          },
          {
            text: '_extra.Cancel',
            color: 'btn-color-red',
            action: onCancelClicked
          },
          {
            text: '_extra.Decline',
            color: 'btn-color-red',
            action: onDeclineClicked
          }
        ]}
        />

      <ProfileDetailsText
        details={[
          {
            title: '_transaction.Reference',
            body: `#${reference}`
          },
          {
            title: '_extra.Type',
            body: t(useTransactionType(type))
          },
          {
            title: '_extra.Date',
            body: useDateFormat(created_at)
          },
          {
            title: '_extra.Status',
            body: t(theStatus)
          }
        ]}
        />

      <UserDescList 
        users={[
          {
            href: `/order/${order.id}`,
            name: `#${order.number}`,
            title: '_order.Order'
          },
          // {
          //   href: `/customer/${customer.id}`,
          //   photo: `/photos/customer/${customer.photo}`,
          //   name: `${customer.first_name} ${customer.last_name}`,
          //   title: '_user.Customer'
          // },
          // {
          //   href: `/store/${store.id}`,
          //   photo: `/photos/store/${store.photo}`,
          //   name: store.name,
          //   title: '_store.Store'
          // },
          // {
          //   href: `/delivery-firm/${delivery_firm.id}`,
          //   photo: `/photos/delivery-firm/${delivery_firm.photo}`,
          //   name: delivery_firm.name,
          //   title: '_delivery.Delivery_firm'
          // }
        ]} 
        />
    </div>
  );
}

export default function Transaction() {

  const [
    transaction, 
    transactionFetchStatus, 
    refetch
  ] = useTransactionFetch();

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            transactionFetchStatus,
            ()=> <Profile transaction={transaction} />,
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>
    </section>
  );
}
