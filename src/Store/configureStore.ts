import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { todos } from '../Reducers/';

// const thank = (store: any) => (next: any) => (action: any) => {
//     console.log(store);
//     // console.log(next);
//     // console.log(action);
//     typeof action === 'function' ? action(store.dispatrch) : next(action);
// };
const logger = createLogger();
const configureStore = () => {
   const middlewares = [thunk];
   //  if (process.env.NODE_ENV !== 'production') {
   //      middlewares.push(createLogger());
   //  }
   const store = createStore(todos, applyMiddleware(...middlewares, logger));
   return store;
};

export default configureStore;
