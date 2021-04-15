import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import MainContent from './Layout/MainContent';
import desktopImage from '../assets/hello-desktop.png';
import mobileImage from '../assets/hello-mobile.png';
import { useIsMobile } from '../hooks/useIsMobile';

import './Authenticated.css';

const Authenticated: FC = () => {
  const { sharedPresentation } = useTypedSelector(state => state.presentation);
  const isMobile = useIsMobile();

  if (!sharedPresentation) {
    return <Redirect to='/' />;
  }

  const image = isMobile ? mobileImage : desktopImage;
  return (
    <div className='authenticated'>
      <MainContent>
        {/* customize this with branding for the specific demo, better styling/layout/content, etc */}
        <img src={image} alt='Hello, Richard!' />
      </MainContent>
    </div>
  );
};

export default Authenticated;
