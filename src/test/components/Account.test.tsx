import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Account from '../../components/Account';
import { store } from '../../state';
import { PresentationActionType } from '../../state/actionTypes/presentation';
import { dummyDeprecatedDemoPresentationDto } from '../mocks';

describe('Authenticated component', () => {
  const component = (
    <Provider store={store} >
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    </Provider>
  );

  it('redirects if there is no Presentation in state', async () => {
    render(component);
    expect(screen.queryByAltText('Your Hooli Account')).not.toBeInTheDocument();
  });

  it('displays a dummy image if there is a presentation in state', () => {
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDeprecatedDemoPresentationDto
    });

    render(component);
    expect(screen.getByAltText('Your Hooli Account')).toBeInTheDocument();
  });
});
