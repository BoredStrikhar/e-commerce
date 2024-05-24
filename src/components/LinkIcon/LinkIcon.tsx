import * as React from 'react';
import { Link } from 'react-router-dom';

type LinkIconProps = {
  children: React.ReactNode;
  className?: string;
  to: string;
};

const LinkIcon: React.FC<LinkIconProps> = ({ className, children, to }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default LinkIcon;
