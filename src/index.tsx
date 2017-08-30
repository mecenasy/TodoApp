import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import App from './App';
import './index.css';
import { todos } from './Reducers/Todos';
import { filter } from './Reducers/Visible';
import registerServiceWorker from './registerServiceWorker';

const todoApp = combineReducers({
  filter,
  todos,
});
const store = createStore(todoApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement);
registerServiceWorker();
