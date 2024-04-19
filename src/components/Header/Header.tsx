import * as React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from 'components/icons/LogoIcon';
import LogoTextIcon from 'components/icons/LogoTextIcon';
import ProfileIcon from 'components/icons/ProfileIcon';
import ShoppingCartIcon from 'components/icons/ShoppingCartIcon';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_inner_container}>
        <Link to="/">
          <div className={styles.header_logo_container}>
            <LogoIcon />
            <LogoTextIcon className={styles.header_logo_text_icon} />
          </div>
        </Link>
        <div className={styles.header_menu_container}>
          <Link to="" className={`${styles.header_menu_page} ${styles.current}`}>
            Products
          </Link>
          <Link to="" className={styles.header_menu_page}>
            Categories
          </Link>
          <Link to="" className={styles.header_menu_page}>
            About us
          </Link>
        </div>
        <div className={styles.header_icons_container}>
          <ShoppingCartIcon />
          <ProfileIcon className={styles.header_profile_icon} />
        </div>
      </div>
    </div>
  );
};

export default Header;
