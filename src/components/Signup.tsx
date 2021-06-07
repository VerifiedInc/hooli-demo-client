import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CredentialRequest } from '@unumid/types';
import UnumIDWidget from '@unumid/react-web-sdk';
import { DemoPresentationRequestCreateOptions } from '@unumid/demo-types';

import { config } from '../config';

import { useActionCreators } from '../hooks/useActionCreators';
import { useTypedSelector } from '../hooks/useTypedSelector';

import MainContent from './Layout/MainContent';
import ContentBox from './Layout/ContentBox';
import HorizontalDivider from './Layout/HorizontalDivider';
import LightFont from './Layout/LightFont';

import './Signup.css';
import desktopImage from '../assets/signup-desktop.png';
import mobileImage from '../assets/signup-mobile.png';
import { useIsMobile } from '../hooks/useIsMobile';
import { client } from '../feathers';
import {
  isDemoAcceptedPresentationDto,
  isDemoDeclinedPresentationDto,
  isDemoPresentationDto,
  isDeprecatedDemoNoPresentationDto,
  isDeprecatedDemoPresentationDto
} from '../typeguards';

import { DemoPresentationLikeDto } from '../types';

const Signup: FC = () => {
  const {
    createPresentationRequest,
    handleDeprecatedPresentationShared,
    handleDeprecatedNoPresentationShared,
    handleAcceptedPresentationShared,
    handleDeclinedPresentationShared
  } = useActionCreators();

  const history = useHistory();
  const { session } = useTypedSelector(state => state.session);
  const { request } = useTypedSelector(state => state.presentationRequest);

  const isMobile = useIsMobile();
  const actuallyCreatePresentationRequest = () => {
    if (!session) return;

    // customize these values for the specific demo (or not)
    const credentialRequests: CredentialRequest[] = [{
      type: 'KYCCredential',
      required: true,
      issuers: [config.issuerDid]
    }];

    const presentationRequestOptions: DemoPresentationRequestCreateOptions = {
      credentialRequests,
      metadata: { fields: { sessionUuid: session.uuid } }
    };

    createPresentationRequest(presentationRequestOptions);
  };

  useEffect(() => {
    actuallyCreatePresentationRequest();
  }, [session]);

  useEffect(() => {
    if (!request?.presentationRequestPostDto) {
      return;
    }

    // now that we've created the request, listen for a presentation
    const presentationService = client.service('presentationWebsocket');
    presentationService.on('created', (data: DemoPresentationLikeDto) => {
      console.log('on presentation created, data', data);

      // handle current cases
      if (isDemoPresentationDto(data)) {
        // handle accepted
        if (isDemoAcceptedPresentationDto(data)) {
          handleAcceptedPresentationShared(data);

          history.push('/authenticated');
        }

        // handle declined
        if (isDemoDeclinedPresentationDto(data)) {
          handleDeclinedPresentationShared(data);
        }
      }

      // handle deprecated presentation
      if (isDeprecatedDemoPresentationDto(data)) {
        handleDeprecatedPresentationShared(data);

        history.push('/hello');
      }

      // handle deprecated noPresentation
      if (isDeprecatedDemoNoPresentationDto(data)) {
        handleDeprecatedNoPresentationShared(data);

        history.push('/declined');
      }
    });

    return () => {
      presentationService.removeAllListeners();
    };
  }, [request?.presentationRequestPostDto]);

  if (!session) return null;

  const image = isMobile ? mobileImage : desktopImage;

  return (
    <div className='signup'>
      <MainContent>
        {/* customize these headers with branding for the specific demo, or remove them entirely */}
        <h1>Welcome to Hooli!</h1>
        <h2>Choose one of the options below to create an account.</h2>
        <ContentBox>
          {/* customize these headers with branding for the specific demo, or remove it entirely */}
          <h2>Instant sign up! <LightFont>(takes 10 seconds)</LightFont></h2>
          <h3>Instantly sign up for Hooli using your verified ACME account.</h3>
          <UnumIDWidget
            env={config.env}
            apiKey={config.webSdkApiKey}
            presentationRequest={request?.presentationRequestPostDto}
            createPresentationRequest={actuallyCreatePresentationRequest}
            createInitialPresentationRequest={false}
          />

          {/* hardcode the rest of the screen with an image */}
          <HorizontalDivider />
          <img src={image} />
        </ContentBox>
      </MainContent>

    </div>
  );
};

export default Signup;
