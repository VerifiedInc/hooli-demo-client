import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Authenticated from '../../components/Authenticated';
import { store } from '../../state';
import { PresentationActionType } from '../../state/actionTypes/presentation';
import { dummyDeprecatedDemoPresentationDto } from '../mocks';

describe('Authenticated component', () => {
  const component = (
    <Provider store={store} >
      <MemoryRouter>
        <Authenticated />
      </MemoryRouter>
    </Provider>
  );

  it('redirects if there is no Presentation in state', async () => {
    render(component);
    expect(screen.queryByAltText('Hello, Richard!')).not.toBeInTheDocument();
  });

  it('displays a dummy image if there is a presentation in state', () => {
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDeprecatedDemoPresentationDto
    });

    render(component);
    expect(screen.getByAltText('Hello, Richard!')).toBeInTheDocument();
  });
});
