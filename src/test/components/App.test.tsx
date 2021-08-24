import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { when } from 'jest-when';

import { store } from '../../../src/state';
import App from '../../components/App';
import { client } from '../../feathers';
import { dummyDemoPresentationRequestoDto, dummySession } from '../mocks';
import userEvent from '@testing-library/user-event';

jest.mock('../../feathers');

describe('app', () => {
  const mockSessionCreate = jest.fn();
  const mockPresentationRequestCreate = jest.fn();
  const mockOn = jest.fn();

  beforeEach(() => {
    mockSessionCreate.mockResolvedValueOnce(dummySession);
    mockPresentationRequestCreate.mockResolvedValueOnce(dummyDemoPresentationRequestoDto);

    when(client.service as unknown as jest.Mock)
      .calledWith('session').mockReturnValue({ create: mockSessionCreate })
      .calledWith('presentationRequest').mockReturnValue({ create: mockPresentationRequestCreate })
      .calledWith('presentationWebsocket').mockReturnValue({ on: mockOn, removeAllListeners: jest.fn() });

    render(<div id='root'><Provider store={store}><App /></Provider></div>);
  });

  it('creates a session', () => {
    expect(mockSessionCreate).toBeCalled();
  });

  it('shows the signup page by default', async () => {
    expect(await screen.findByText('Welcome to Hooli!')).toBeInTheDocument();
  });
});
