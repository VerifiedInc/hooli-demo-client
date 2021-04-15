import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import MainContent from './Layout/MainContent';
import desktopImage from '../assets/account-desktop.png';
import mobileImage from '../assets/account-mobile.png';
import { useIsMobile } from '../hooks/useIsMobile';

import './Authenticated.css';

const Account: FC = () => {
  const { sharedPresentation } = useTypedSelector(state => state.presentation);
  const isMobile = useIsMobile();

  if (!sharedPresentation) {
    return <Redirect to='/' />;
  }

  const image = isMobile ? mobileImage : desktopImage;
  return (
    <div className='account'>
      <MainContent>
        {/* customize this with branding for the specific demo, better styling/layout/content, etc */}
        <img src={image} alt='Your Hooli Account' />
      </MainContent>
    </div>
  );
};

export default Account;
