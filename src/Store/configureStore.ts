import { createStore } from 'redux';
import todoApp from '../Reducers/';

const promise = (store: any) => (next: any) => (action: any) => {
    if (typeof action.then === 'function') {
        return action.then(next);
    }
    return next(action);
};

const logger = (store: any) => (next: any) => (action: any) => {
    console.group(action.type);
    console.log('prev state', store.getState());
    console.log('action', action);
    const returnValue = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return returnValue;

};

const wrapDispatchWithMidleware = (store: any, middlewares: any) => {
    middlewares.slice().reverse().forEach((element: any) => {
        store.dispatch = element(store)(store.dispatch);
    });
};

const configureStore = () => {
    const store = createStore(todoApp);
    const middlewares = [promise];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }
    wrapDispatchWithMidleware(store, middlewares);
    return store;
};

export default configureStore;
