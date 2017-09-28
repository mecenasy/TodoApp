import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import configureStore from './store/configure';
import { IntlProvider } from 'react-intl';
import { getCounters } from './modules/counter/actions';

import CounterList from './modules/counter/Components/CounterList';
import Dumb from './modules/dumb/Dumb';

import { translationMessages } from './languages';

const history = createBrowserHistory();
const initialState = window.__INITIAL_STATE__ || {};
const store = configureStore(history, initialState);

const renderApp = messages => {
   // This code starts up the React app when it runs in a browser. It sets up the routing configuration
   // and injects the app into a DOM element.
   ReactDOM.render(
      <AppContainer>
         <Provider store={store}>
            <ConnectedRouter history={history}>
               <IntlProvider messages={messages.pl} locale={'pl'} >
                  <Switch>
                     <Route exact={true} path="/" component={CounterList} />
                     <Route component={Dumb} />
                  </Switch>
               </IntlProvider>
            </ConnectedRouter>
         </Provider>
      </AppContainer>,
      document.getElementById('app'),
   );
};

store.dispatch(getCounters());
renderApp(translationMessages);

if (module.hot) {
   module.hot.accept('./modules/counter/Components/CounterList', () => {
      const component = require<typeof CounterList>('./modules/counter/Components/CounterList');
      renderApp(translationMessages);
   });
}

// const render = () => {
//    return renderApp(translationMessages);
// }
// store.subscribe(render)
// render();

// Allow Hot Module Replacement
// if (module.hot) {
//    module.hot.accept('./routes', () => {
//       routes = require<typeof RoutesModule>('./routes').routes;
//       renderApp();
//    });
// }
