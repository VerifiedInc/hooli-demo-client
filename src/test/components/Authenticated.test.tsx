import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Authenticated from '../../components/Authenticated';
import { store } from '../../state';
import { PresentationActionType } from '../../state/actionTypes/presentation';
import { dummyDemoAcceptedPresentationDto, dummyDeprecatedDemoPresentationDto } from '../mocks';

describe('Authenticated component', () => {
  const component = (
    <Provider store={store}>
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

  it('displays the user\'s first name from the credential', () => {
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDemoAcceptedPresentationDto
    });

    const { firstName } = JSON.parse(dummyDemoAcceptedPresentationDto.presentation.verifiableCredential[0].credentialSubject);

    render(component);
    expect(screen.getByText(`Hello, ${firstName}!`)).toBeInTheDocument();
  });
});
