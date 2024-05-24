import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import rootStore from 'store/RootStore';
import { validateEmail } from 'utils/signUpValidation';
import s from './SignInPage.module.scss';

const SignInPage = () => {
  const [currentEmailValue, setCurrentEmailValue] = useState('');
  const [currentPasswordValue, setCurrentPasswordValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleEmailChange = useCallback((value: string) => {
    setCurrentEmailValue(value);
    setIsEmailValid(validateEmail(value));
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setCurrentPasswordValue(value);
  }, []);

  const handleSignInClick = (e: React.FormEvent) => {
    e.preventDefault();

    rootStore.user.signIn(
      {
        email: currentEmailValue,
        password: currentPasswordValue,
      },
      () => {
        navigate(`/profile`);
      },
    );
  };

  return (
    <div className={s['sign-in-wrapper']}>
      <div className={s['sign-in-card']}>
        <form className={s['sign-in-form']} onSubmit={handleSignInClick}>
          <Text tag="h1" view="p-20" weight="bold" className={s['sign-in-form__title']}>
            Sign In
          </Text>
          <Input
            placeholder="Email"
            value={currentEmailValue}
            onChange={handleEmailChange}
            type="email"
            className={cn(s['sign-in-form__input'], {
              [s['sign-in-form__input_invalid']]: currentEmailValue && !isEmailValid,
            })}
          />
          {currentEmailValue && !isEmailValid && <Text className={s['sign-in-form__invalid-text']}>Invalid email</Text>}
          <Input
            placeholder="Password"
            value={currentPasswordValue}
            onChange={handlePasswordChange}
            type="password"
            className={s['sign-in-form__input']}
          />
          {rootStore.user.error && <Text className={s['sign-in-form__invalid-text']}>Invalid email or password</Text>}

          <Button className={s['sign-in-form__button']} type="submit" disabled={!isEmailValid || !currentPasswordValue}>
            Sign In
          </Button>
          <Text view="p-16" className={s['sign-in-form__new-user-text']}>
            New to Lalasia?
          </Text>
          <Link to="/signup">
            <Text color='accent'>Create an account</Text>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default observer(SignInPage);
