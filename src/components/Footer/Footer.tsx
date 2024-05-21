import cn from 'classnames';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Text from 'components/Text';
import s from './Footer.module.scss';
import { footerPageUrls } from './config';

const Footer = () => {
  const location = useLocation();

  return (
    <div className={s['footer-container']}>
      <div className={s['footer']}>
        <Link to="/">
          <Text view="p-20" color="white" weight="bold">
            Lalasia Shop
          </Text>
        </Link>
        <div className={s['footer__menu']}>
          {footerPageUrls.map((item: { url: string; title: string }) => (
            <Link
              to={item.url}
              key={item.title}
              className={cn(s['footer__page'], {
                [s['current']]: location.pathname === item.url,
              })}
            >
              <Text view="p-18" color="white">
                {item.title}
              </Text>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
