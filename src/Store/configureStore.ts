import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import * as promise from 'redux-promise';
import todoApp from '../Reducers/';

const configureStore = () => {
    const middlewares = [promise];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }
    const store = createStore(todoApp, applyMiddleware(...middlewares));
    return store;
};

export default configureStore;
