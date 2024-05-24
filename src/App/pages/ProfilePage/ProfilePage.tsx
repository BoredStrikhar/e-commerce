import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Text from 'components/Text';
import rootStore from 'store/RootStore';
import s from './ProfilePage.module.scss';

const ProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      rootStore.user.getProfile();
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const handleLogOutClick = () => {
    rootStore.user.logOut();
    navigate('/signin');
  };

  const orders = rootStore.orders.getOrdersByEmail(rootStore.user.user.email);

  return (
    <div className={s['profile-wrapper']}>
      <div className={s['profile']}>
        <Text tag="h1" view="title">
          Your Profile
        </Text>
        <Text view="p-20" className={s['profile__name']}>
          {rootStore.user.user.name}
        </Text>
        <Text view="p-20" className={s['profile__email']}>
          {rootStore.user.user.email}
        </Text>
        <Button onClick={handleLogOutClick}>Log Out</Button>
      </div>
      <div className={s['orders']}>
        <div className={s['orders__header']}>
          <Text view="title">Orders</Text>
          <Text className={s['orders__counter']} view="p-20" color="accent" weight="bold">
            {orders ? orders.length : 0}
          </Text>
        </div>
        {orders ? (
          orders.map((order) => (
            <div key={order.address} className={s['order']}>
              <Text view="p-20" color="white" className={s['order__address']}>
                Address: {order.address}
              </Text>
              <Text view="p-20" color="white" className={s['order__price']}>
                Total Price: {order.total}$
              </Text>
              <Text view="p-20" color="white" className={s['order__products']}>
                Products:
              </Text>
              {order.products.map((product) => (
                <div key={product.id} className={s['order__product-wrapper']}>
                  {/* <img src={product.images[0]} className={s['order__image']}></img> */}
                  <Text view="p-20" color="white" className={s['order__product-title']}>
                    {product.title}
                  </Text>
                </div>
              ))}
            </div>
          ))
        ) : (
          <Text view="p-20">No orders</Text>
        )}
      </div>
    </div>
  );
};

export default observer(ProfilePage);
