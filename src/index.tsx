import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Componet/Root';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './Store/configureStore';
const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root') as HTMLElement);
registerServiceWorker();
