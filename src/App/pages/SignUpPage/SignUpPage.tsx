import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import rootStore from 'store/RootStore';
import { PasswordStrength, getPasswordStrength, validateEmail } from 'utils/signUpValidation';
import s from './SignUpPage.module.scss';

const SignUpPage = () => {
  const [currentNameValue, setCurrentNameValue] = useState('');
  const [currentEmailValue, setCurrentEmailValue] = useState('');
  const [currentPasswordValue, setCurrentPasswordValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(PasswordStrength.InvalidLength);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleNameChange = useCallback((value: string) => {
    setCurrentNameValue(value);
  }, []);

  const handleEmailChange = useCallback((value: string) => {
    setCurrentEmailValue(value);
    setIsEmailValid(validateEmail(value));
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setCurrentPasswordValue(value);
    setPasswordStrength(getPasswordStrength(value));
  }, []);

  const handleSignUpClick = (e: React.FormEvent) => {
    e.preventDefault();
    rootStore.user.signUp(
      {
        name: currentNameValue,
        email: currentEmailValue,
        password: currentPasswordValue,
        //нельзя отправлять запрос без аватара, пока оставил как заглушку
        avatar:
          'https://freedomtoteach.collins.co.uk/wp-content/uploads/sites/87/2023/03/shutterstock_397626016-1-scaled.jpg',
      },
      () => {
        navigate(`/profile`);
      },
    );
  };
  if (!localStorage.getItem('access_token')) {
    return (
      <div className={s['sign-up-wrapper']}>
        <div className={s['sign-up-card']}>
          <form className={s['sign-up-form']} onSubmit={handleSignUpClick}>
            <Text tag="h1" view="p-20" weight="bold" className={s['sign-up-form__title']}>
              Sign Up
            </Text>
            <Input
              placeholder="Name"
              value={currentNameValue}
              onChange={handleNameChange}
              className={s['sign-up-form__input']}
            />
            <Input
              placeholder="Email"
              value={currentEmailValue}
              onChange={handleEmailChange}
              type="email"
              className={cn(s['sign-up-form__input'], {
                [s['sign-up-form__input_invalid']]: currentEmailValue && !isEmailValid,
              })}
            />
            {currentEmailValue && !isEmailValid && (
              <Text className={s['sign-up-form__invalid-text']}>Invalid email</Text>
            )}
            <Input
              placeholder="Password"
              value={currentPasswordValue}
              onChange={handlePasswordChange}
              type="password"
              className={cn(s['sign-up-form__input'], {
                [s['sign-up-form__input_invalid']]:
                  (currentPasswordValue && passwordStrength === PasswordStrength.InvalidLength) ||
                  (currentPasswordValue && passwordStrength === PasswordStrength.InvalidSymbols),
              })}
            />
            {currentPasswordValue && passwordStrength === PasswordStrength.InvalidLength && (
              <Text className={s['sign-up-form__invalid-text']}>
                Password must be longer than or equal to 4 characters
              </Text>
            )}
            {passwordStrength === PasswordStrength.InvalidSymbols && (
              <Text className={s['sign-up-form__invalid-text']}>Password must contain only letters and numbers</Text>
            )}
            {passwordStrength !== PasswordStrength.InvalidLength &&
              passwordStrength !== PasswordStrength.InvalidSymbols && (
                <div className={s['strength-checker']}>
                  <div
                    className={cn(
                      s['strength-checker__progress-bar'],
                      s[`strength-checker__progress-bar_${passwordStrength}`],
                    )}
                  ></div>
                  <Text view="p-14" className={s['strength-checker__title']}>
                    {passwordStrength}
                  </Text>
                </div>
              )}
            <Button
              className={s['sign-up-form__button']}
              type="submit"
              disabled={
                !currentNameValue ||
                !isEmailValid ||
                passwordStrength === PasswordStrength.InvalidLength ||
                passwordStrength === PasswordStrength.InvalidSymbols
              }
            >
              Sign Up
            </Button>
            <Text view="p-16" className={s['sign-up-form__new-user-text']}>
              Already have an account?
            </Text>
            <Link to="/signin">Sign In</Link>
          </form>
        </div>
      </div>
    );
  }
};

export default SignUpPage;
