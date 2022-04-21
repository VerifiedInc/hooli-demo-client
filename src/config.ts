import { SaasEnvironment } from '@unumid/web-sdk-react';

interface Config {
  serverUrl: string;
  issuerDid: string;
  env: SaasEnvironment;
  webSdkApiKey: string;
  logRocketId: string;
}

const {
  REACT_APP_SERVER_URL = '',
  REACT_APP_ISSUER_DID = '',
  REACT_APP_ENV = 'development',
  REACT_APP_WEB_SDK_API_KEY = '',
  REACT_APP_LOG_ROCKET_ID = ''
} = process.env;

export const config: Config = {
  serverUrl: REACT_APP_SERVER_URL,
  issuerDid: REACT_APP_ISSUER_DID,
  env: REACT_APP_ENV as SaasEnvironment,
  webSdkApiKey: REACT_APP_WEB_SDK_API_KEY,
  logRocketId: REACT_APP_LOG_ROCKET_ID
};

console.log('config', config);
