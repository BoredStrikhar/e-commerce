import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import s from './CheckoutPage.module.scss';

const CheckoutPage = () => {
  const [currentCardNumber, setCurrentCardNumber] = useState('');
  const [currentCardDate, setCurrentCardDate] = useState('');
  const [currentCardCVC, setCurrentCardCVC] = useState('');
  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [isCardDateValid, setIsCardDateValid] = useState(false);
  const [isCardCVCValid, setIsCardCVCValid] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const cardNumberValidLength = 19;
  const cardDateValidLength = 5;
  const cardCVCValidLength = 3;

  const navigate = useNavigate();

  if (localStorage.getItem('access_token')) {
    rootStore.user.getProfile();
  }

  const handleCardNumberChange = (value: string) => {
    const parsedValue = value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .slice(0, cardNumberValidLength);

    setCurrentCardNumber(parsedValue);

    if (parsedValue.length === cardNumberValidLength) {
      setIsCardNumberValid(true);
      return;
    }

    setIsCardNumberValid(false);
  };

  const handleCardDateChange = (value: string) => {
    const parsedValue = value
      .replace(/\D/g, '')
      .replace(/(\d{2})(?=\d)/g, '$1/')
      .slice(0, cardDateValidLength);

    setCurrentCardDate(parsedValue);

    if (parsedValue.length === cardDateValidLength) {
      setIsCardDateValid(true);
      return;
    }

    setIsCardDateValid(false);
  };

  const handleCardCVCChange = (value: string) => {
    const parsedValue = value.replace(/\D/g, '').slice(0, cardCVCValidLength);

    setCurrentCardCVC(parsedValue);

    if (parsedValue.length === cardCVCValidLength) {
      setIsCardCVCValid(true);
      return;
    }

    setIsCardCVCValid(false);
  };

  const handleAddressChange = useCallback((value: string) => {
    setCurrentAddress(value);
  }, []);

  const handleClick = () => {
    const order = {
      products: rootStore.cart.products,
      address: currentAddress,
      total: rootStore.cart.cartTotal,
    };

    rootStore.orders.addOrder(rootStore.user.user.email, order);

    rootStore.cart.removeCart();

    navigate('/success');
  };

  return (
    <form className={s['checkout-wrapper']} onSubmit={handleClick}>
      <Text tag="h1" view="title">
        Checkout
      </Text>
      <div className={s['checkout']}>
        <div className={s['checkout__fields']}>
          <Text view="p-20" weight="bold">
            {'Total = ' + rootStore.cart.cartTotal + '$'}
          </Text>
          <Input
            placeholder="Address"
            value={currentAddress}
            onChange={handleAddressChange}
            className={s['checkout__address']}
          ></Input>
        </div>
        <div className={s['payment-card']}>
          <Text view="p-16" color="white">
            Card Number
          </Text>
          <Input
            value={currentCardNumber}
            onChange={handleCardNumberChange}
            className={s['payment-card__input-card-number']}
            placeholder="XXXX XXXX XXXX XXXX"
          />
          <div className={s['payment-card__inner-wrapper']}>
            <div>
              <Text view="p-16" color="white">
                Expiration Date
              </Text>
              <Input
                value={currentCardDate}
                onChange={handleCardDateChange}
                className={s['payment-card__input-card-date']}
                placeholder="XX/XX"
              />
            </div>
            <div>
              <Text view="p-16" color="white">
                CVC
              </Text>
              <Input
                value={currentCardCVC}
                onChange={handleCardCVCChange}
                className={s['payment-card__input-card-cvc']}
                placeholder="XXX"
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        disabled={!isCardNumberValid || !isCardDateValid || !isCardCVCValid || !currentAddress}
        type="submit"
        className={s['pay-button']}
      >
        Pay
      </Button>
    </form>
  );
};

export default observer(CheckoutPage);
