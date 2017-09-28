import { createStore, compose, applyMiddleware, combineReducers, StoreEnhancerStoreCreator } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
// import {reducers, ApplicationState} from './reducers';
import { ApplicationState, reducers } from './reducers';
import { rootSaga } from './rootSaga';

export default function configureStore(history, initialState) {
   // Build middleware. These are functions that can process the actions before they reach the store.
   const sagaMiddleware = createSagaMiddleware();

   const middlewares = [
      sagaMiddleware,
      routerMiddleware(history),
   ];
   if (process.env.NODE_ENV !== 'production') {
      middlewares.unshift(require('redux-immutable-state-invariant').default());
   }

   // If devTools is installed, connect to it
   const windowIfDefined = typeof window === 'undefined' ? null : window as any;
   const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension; // as () => GenericStoreEnhancer;

   const composedMiddlewares = compose(
      applyMiddleware(...middlewares),
      devToolsExtension ? devToolsExtension() : (next) => next,
   );

   // Combine all reducers and instantiate the app-wide store instance
   const allReducers = buildRootReducer(reducers);
   // const store = createStoreWithMiddleware(allReducers, initialState);// as Store<ApplicationState>;
   const store = createStore(
      allReducers,
      composedMiddlewares,
   );

   // Enable Webpack hot module replacement for reducers
   if (module.hot) {
      module.hot.accept('./reducers', () => {
         const nextRootReducer = require('./reducers'); // <typeof StoreModule>
         store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
      });
   }

   // launching root saga
   sagaMiddleware.run(rootSaga);

   return store;
}

function buildRootReducer(allReducers) {
   return combineReducers<ApplicationState>({ ...allReducers, routing: routerReducer });
}
