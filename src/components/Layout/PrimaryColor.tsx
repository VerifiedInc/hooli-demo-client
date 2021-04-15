import { FC } from 'react';

import './PrimaryColor.css';

const PrimaryColor: FC = ({ children }) => {
  return <span className='primary-color'>{children}</span>;
};

export default PrimaryColor;
