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
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
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
        <Text view="title">Orders</Text>
        {orders ? (
          orders.map((order) => (
            <div key={order.address} className={s['orders__order']}>
              <Text view="p-20" color="white">
                Address: {order.address}
              </Text>
              <Text view="p-20" color="white">
                Products:
              </Text>
              {order.products.map((product) => (
                <Text view="p-20" key={product.id} color="white">
                  {product.title}
                </Text>
              ))}
              <Text view="p-20" color="white">
                Total Price: {order.total}
              </Text>
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
