import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import * as promise from 'redux-promise';
import todoApp from '../Reducers/';

// const promise = (store: any) => (next: any) => (action: any) => {
//     if (typeof action.then === 'function') {
//         return action.then(next);
//     }
//     return next(action);
// };

// const logger = (store: any) => (next: any) => (action: any) => {
//     console.group(action.type);
//     console.log('prev state', store.getState());
//     console.log('action', action);
//     const returnValue = next(action);
//     console.log('next state', store.getState());
//     console.groupEnd();
//     return returnValue;

// };

const configureStore = () => {
    const middlewares = [promise];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }
    const store = createStore(todoApp, applyMiddleware(...middlewares));
    return store;
};

export default configureStore;
