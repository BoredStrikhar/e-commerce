import classNames from 'classnames';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LinkIcon from 'components/LinkIcon';
import Text from 'components/Text';
import LogoIcon from 'components/icons/LogoIcon';
import LogoTextIcon from 'components/icons/LogoTextIcon';
import ProfileIcon from 'components/icons/ProfileIcon';
import ShoppingCartIcon from 'components/icons/ShoppingCartIcon';
import styles from './Header.module.scss';
import { headerPageUrls } from './config';

const Header = () => {
  const location = useLocation();

  return (
    <div className={styles['header-container']}>
      <div className={styles['header-inner-container']}>
        <Link to="/">
          <div className={styles['header-logo-container']}>
            <LogoIcon />
            <LogoTextIcon className={styles['header-logo-text-icon']} />
          </div>
        </Link>
        <div className={styles['header-menu-container']}>
          {/* <Link to="" className={classNames(styles['header-menu-page'], styles['current'])}>
            <Text view="p-18">Products</Text>
          </Link>
          <Link to="" className={styles['header-menu-page']}>
            <Text view="p-18" color="primary">
              Categories
            </Text>
          </Link>
          <Link to="" className={styles['header-menu-page']}>
            <Text view="p-18" color="primary">
              About us
            </Text>
          </Link> */}
          {headerPageUrls.map((item: { url: string; title: string }) => (
            <Link
              to={item.url}
              key={item.title}
              className={classNames(styles['header-menu-page'], { [styles['current']]: location.pathname === item.url })}
            >
              <Text view="p-18" color='primary'>
                {item.title}
              </Text>
            </Link>
          ))}
        </div>
        <div className={styles['header-icons-container']}>
          <LinkIcon to="/">
            <ShoppingCartIcon />
          </LinkIcon>
          <LinkIcon to="/">
            <ProfileIcon className={styles['header-profile-icon']} />
          </LinkIcon>
        </div>
      </div>
    </div>
  );
};

export default Header;
