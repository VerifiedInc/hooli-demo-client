import { FCWithClassName } from '../../types';
import './LightFont.css';

const LightFont: FCWithClassName = ({ children = null, className = undefined }) => {
  const classNames = className ? `light-font ${className}` : 'light-font';
  return (
    <span className={classNames}>{children}</span>
  );
};

export default LightFont;
