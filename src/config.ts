interface Config {
  serverUrl: string;
  issuerDid: string;
  env: string;
  webSdkApiKey: string;
}

const {
  REACT_APP_SERVER_URL = '',
  REACT_APP_ISSUER_DID = '',
  REACT_APP_ENV = 'development',
  REACT_APP_WEB_SDK_API_KEY = ''
} = process.env;

export const config: Config = {
  serverUrl: REACT_APP_SERVER_URL,
  issuerDid: REACT_APP_ISSUER_DID,
  env: REACT_APP_ENV,
  webSdkApiKey: REACT_APP_WEB_SDK_API_KEY
};

console.log('config', config);
