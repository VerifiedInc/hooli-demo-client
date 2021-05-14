import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import MainContent from './Layout/MainContent';
import desktopImage from '../assets/hello-desktop.png';
import mobileImage from '../assets/hello-mobile.png';
import { useIsMobile } from '../hooks/useIsMobile';

import './Authenticated.css';
import { isDemoPresentationDto } from '../typeguards';

const Authenticated: FC = () => {
  const { sharedPresentation } = useTypedSelector(state => state.presentation);
  const isMobile = useIsMobile();

  if (!sharedPresentation) {
    return <Redirect to='/' />;
  }

  const credentials = isDemoPresentationDto(sharedPresentation)
    ? sharedPresentation.presentation.verifiableCredential
    : sharedPresentation.presentation.verifiableCredentials;

  if (!credentials) {
    return <Redirect to='/' />;
  }

  const credentialSubject = credentials[0].credentialSubject;

  const firstName = typeof credentialSubject === 'string' ? JSON.parse(credentialSubject).firstName : credentialSubject.firstName;

  const image = isMobile ? mobileImage : desktopImage;
  return (
    <div className='authenticated'>
      <MainContent>
        {/* customize this with branding for the specific demo, better styling/layout/content, etc */}
        <div className='hello'>Hello, {firstName}! <span role='img' aria-label='wave'>👋</span></div>
        <img src={image} alt='Hello, Richard!' />
      </MainContent>
    </div>
  );
};

export default Authenticated;
