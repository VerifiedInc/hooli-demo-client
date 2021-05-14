import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import Header from './Header';
import HeaderCenter from './HeaderCenter';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import LinkTab from './LinkTab';
import Tab from './Tab';
import LogoutTab from './LogoutTab';
import LightFont from '../Layout/LightFont';
import logo from '../../assets/logo-blue-background.png';

import './PrimaryHeader.css';
import PrimaryColor from '../Layout/PrimaryColor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { isDemoPresentationDto } from '../../typeguards';

const PrimaryHeader: FC = () => {
  const { sharedPresentation } = useTypedSelector(state => state.presentation);

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

  return (
    <Header className='primary-header'>
      <HeaderLeft>
        <LinkTab to='/hello'>
          <PrimaryColor>
            <FontAwesomeIcon icon={faUser} size='lg' />&nbsp;&nbsp;
            {firstName.toUpperCase()}
          </PrimaryColor>
        </LinkTab>
        <LinkTab to='/account'>ACCOUNT</LinkTab>
        <LogoutTab />
      </HeaderLeft>
      <HeaderCenter>
        <img src={logo} alt='Hooli' />
      </HeaderCenter>
      <HeaderRight>
        <Tab><LightFont><PrimaryColor>Making the world a better place.</PrimaryColor></LightFont></Tab>
      </HeaderRight>
    </Header>
  );
};

export default PrimaryHeader;
