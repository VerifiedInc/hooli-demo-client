import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrimaryHeader from '../../../components/Header/PrimaryHeader';
import { store } from '../../../state';
import { PresentationActionType } from '../../../state/actionTypes/presentation';
import { dummyDemoAcceptedPresentationDto } from '../../mocks';

describe('PrimaryHeader', () => {
  const component = <Provider store={store}><MemoryRouter><PrimaryHeader /></MemoryRouter></Provider>;
  it('renders a header with a classname of primary-header', () => {
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDemoAcceptedPresentationDto
    });
    render(component);
    expect(screen.getByText('ACCOUNT').closest('header')).toHaveClass('primary-header');
  });

  it('renders a link to the account page', () => {
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDemoAcceptedPresentationDto
    });
    render(component);
    const tab = screen.getByText('ACCOUNT');
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveAttribute('href', '/account');
  });

  it('renders a link to the hello page with the user\'s first name from the credential', () => {
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDemoAcceptedPresentationDto
    });

    const { firstName } = JSON.parse(dummyDemoAcceptedPresentationDto.presentation.verifiableCredential[0].credentialSubject);
    render(component);
    const tab = screen.getByText(firstName.toUpperCase(), { exact: false });
    expect(tab).toBeInTheDocument();
    expect(tab.closest('a')).toHaveAttribute('href', '/hello');
  });

  it('renders a Logout tab', () => {
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDemoAcceptedPresentationDto
    });
    render(component);
    expect(screen.getByText('LOGOUT')).toBeInTheDocument();
  });

  it('renders a right side tab', () => {
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDemoAcceptedPresentationDto
    });
    render(component);
    expect(screen.getByText('Making the world a better place.')).toBeInTheDocument();
  });
});
