import { render } from 'react-dom';
import { Provider } from 'react-redux';
import LogRocket from 'logrocket';

import { store } from './state';
import App from './components/App';
import { config } from './config';

import './index.css';

LogRocket.init(config.logRocketId);

render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
