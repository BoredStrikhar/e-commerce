import * as React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';

type LinkIconProps = {
  children: React.ReactNode;
  className?: string;
  to: string;
};

const LinkIcon: React.FC<LinkIconProps> = ({ className, children, to }) => {
  return (
    <Link to={to} className={className}>
      <Text view="p-18" color="white" weight="normal">
        {children}
      </Text>
    </Link>
  );
};

export default LinkIcon;
