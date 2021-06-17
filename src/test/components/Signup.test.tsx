import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { when } from 'jest-when';

import Signup from '../../components/Signup';
import { store } from '../../state';
import { client } from '../../feathers';
import {
  dummyDemoAcceptedPresentationDto,
  dummyDemoDeclinedPresentationDto,
  dummyDemoPresentationRequestoDto,
  dummyDeprecatedDemoNoPresentationDto,
  dummyDeprecatedDemoPresentationDto,
  dummySession
} from '../mocks';
import { createSession } from '../../state/actionCreators';
import { DemoPresentationLikeDto } from '../../types';

jest.mock('../../feathers', () => ({
  client: {
    service: jest.fn()
  }
}));

const mockPush = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useHistory: () => ({ push: mockPush })
  };
});

describe('signup', () => {
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

    createSession()(store.dispatch);
    render(<Provider store={store}><Signup /></Provider>);
  });

  it('displays a welcome header', async () => {
    expect(await screen.findByText('Welcome to Hooli!')).toBeInTheDocument();
  });

  it('creates a presentationRequest', async () => {
    await screen.findByText('Welcome to Hooli!');
    expect(mockPresentationRequestCreate).toBeCalled();
  });

  it('listens for created presentations', async () => {
    await screen.findByAltText('Powered by Unum ID');
    expect(mockOn.mock.calls[0][0]).toEqual('created');
  });

  describe('handling presentations', () => {
    let handler: (data: DemoPresentationLikeDto) => Promise<void>;

    beforeEach(async () => {
      await screen.findByAltText('Powered by Unum ID');
      handler = mockOn.mock.calls[0][1];
    });

    it('handles a DemoAcceptedPresentationDto', async () => {
      await handler(dummyDemoAcceptedPresentationDto);

      // state is updated correctly
      const expected = store.getState().presentation.sharedPresentation;
      expect(expected).toEqual(dummyDemoAcceptedPresentationDto);

      // redirects to correct route
      expect(mockPush).toBeCalledWith('/hello');
    });

    it('handles a DemoDeclinedPresentationDto', async () => {
      await handler(dummyDemoDeclinedPresentationDto);

      // state is updated correctly
      const expected = store.getState().presentation.sharedNoPresentation;
      expect(expected).toEqual(dummyDemoDeclinedPresentationDto);

      // redirects to correct route
      expect(mockPush).toBeCalledWith('/declined');
    });

    it('handles a DeprecatedDemoPresentationDto', async () => {
      await handler(dummyDeprecatedDemoPresentationDto);

      // state is updated correctly
      const expected = store.getState().presentation.sharedPresentation;
      expect(expected).toEqual(dummyDeprecatedDemoPresentationDto);

      // redirects to correct route
      expect(mockPush).toBeCalledWith('/hello');
    });

    it('handles a DemoDeprecatedNoPresentationDto', async () => {
      await handler(dummyDeprecatedDemoNoPresentationDto);

      // state is updated correctly
      const expected = store.getState().presentation.sharedNoPresentation;
      expect(expected).toEqual(dummyDeprecatedDemoNoPresentationDto);

      // redirects to correct route
      expect(mockPush).toBeCalledWith('/declined');
    });
  });

  it('shows the web sdk widget', async () => {
    expect(await screen.findByAltText('Powered by Unum ID')).toBeInTheDocument();
  });
});
