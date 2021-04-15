import { FC } from 'react';

import Header from './Header';
import HeaderCenter from './HeaderCenter';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import LinkTab from './LinkTab';
import LightFont from '../Layout/LightFont';
import Tab from './Tab';

import './AltHeader.css';
import logo from '../../assets/logo-white-background.png';

const AltHeader: FC = () => {
  return (
    <Header className='alternate-header'>
      <HeaderLeft>
        <Tab>HOME</Tab>
        <Tab>ABOUT GAVIN</Tab>
        <Tab>HOOLI-CON</Tab>
      </HeaderLeft>
      <HeaderCenter>
        <img src={logo} alt='Hooli' />
      </HeaderCenter>
      <HeaderRight>
        <Tab><LightFont>Making the world a better place.</LightFont></Tab>
      </HeaderRight>
    </Header>
  );
};

export default AltHeader;
