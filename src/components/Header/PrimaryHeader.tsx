import { FC } from 'react';

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

const PrimaryHeader: FC = () => {
  return (
    <Header className='primary-header'>
      <HeaderLeft>
        <LinkTab to='/hello'>
          <PrimaryColor>
            <FontAwesomeIcon icon={faUser} size='lg' />&nbsp;
            RICHARD HENDRICKS
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
