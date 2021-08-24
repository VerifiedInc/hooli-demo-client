import { FC, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { useActionCreators } from '../hooks/useActionCreators';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Authenticated from './Authenticated';
import Declined from './Declined';
import Account from './Account';

import AltHeader from './Header/AltHeader';
import PrimaryHeader from './Header/PrimaryHeader';
import Signup from './Signup';
import Footer from './Layout/Footer';

const App: FC = () => {
  const { createSession } = useActionCreators();
  const { session } = useTypedSelector(state => state.session);

  useEffect(() => {
    if (!session) {
      createSession();
    }
  }, [session]);

  return (
    <div>
      <BrowserRouter>
        <Route exact path='/'>
          <AltHeader />
          <Signup />
        </Route>
        <Route path='/hello'>
          <PrimaryHeader />
          <Authenticated />
        </Route>
        <Route path='/account'>
          <PrimaryHeader />
          <Account />
        </Route>
        <Route path='/declined'>
          <AltHeader />
          <Declined />
        </Route>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
