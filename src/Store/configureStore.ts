
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { todos } from '../Reducers/';

// const thank = (store: any) => (next: any) => (action: any) => {
//     console.log(store);
//     // console.log(next);
//     // console.log(action);
//     typeof action === 'function' ? action(store.dispatrch) : next(action);
// };
// połączenie z dev toolsami

const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension;

const logger = createLogger();

const middlewares = [];

middlewares.push(thunk);

if (process.env.NODE_ENV !== 'production') {
   middlewares.push(logger);
}

const composedMiddlewares = compose(
   applyMiddleware(...middlewares),
   devToolsExtension ? devToolsExtension() : (next: any) => next,
);
const configureStore = () => {
   const store = createStore(todos, composedMiddlewares);
   return store;
};

export default configureStore;
