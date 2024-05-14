import cn from 'classnames';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LinkIcon from 'components/LinkIcon';
import Text from 'components/Text';
import LogoIcon from 'components/icons/LogoIcon';
import LogoTextIcon from 'components/icons/LogoTextIcon';
import ProfileIcon from 'components/icons/ProfileIcon';
import ShoppingCartIcon from 'components/icons/ShoppingCartIcon';
import s from './Header.module.scss';
import { headerPageUrls } from './config';

const Header = () => {
  const location = useLocation();

  return (
    <div className={s['header-container']}>
      <div className={s['header']}>
        <Link to="/">
          <div className={s['header__logo']}>
            <LogoIcon />
            <LogoTextIcon className={s['header__text-icon']} />
          </div>
        </Link>
        <div className={s['header__menu']}>
          {headerPageUrls.map((item: { url: string; title: string }) => (
            <Link
              to={item.url}
              key={item.title}
              className={cn(s['header__page'], {
                [s['current']]: location.pathname === item.url,
              })}
            >
              <Text view="p-18" color="primary">
                {item.title}
              </Text>
            </Link>
          ))}
        </div>
        <div className={s['header__icons']}>
          <LinkIcon to="/">
            <ShoppingCartIcon />
          </LinkIcon>
          <LinkIcon to="/profile">
            <ProfileIcon className={s['header__profile-icon']} />
          </LinkIcon>
        </div>
      </div>
    </div>
  );
};

export default Header;
