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

  return (
    <div className={s['profile-wrapper']}>
      <Text tag="h1" view="title">
        Profile
      </Text>
      <Text view="p-20">{rootStore.user.user.name}</Text>
      <Text view="p-20">{rootStore.user.user.email}</Text>
      <Button onClick={handleLogOutClick}>Log Out</Button>
    </div>
  );
};

export default observer(ProfilePage);
