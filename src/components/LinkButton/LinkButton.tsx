import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import styles from './LinkButton.module.scss';

type LinkButtonProps = {
  children: React.ReactNode;
  className?: string;
  to: string;
  background?: 'accent' | 'primary';
};

const LinkButton: React.FC<LinkButtonProps> = ({ className, children, to, background = 'primary' }) => {
  return (
    <Link to={to} className={classNames(styles['link-button'], styles[background], className)}>
      <Text view="p-18" color="white" weight="normal">
        {children}
      </Text>
    </Link>
  );
};

export default LinkButton;
