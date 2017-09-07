import { createStore } from 'redux';
import todoApp from '../Reducers/';

const addPromiseSupportToDispatch = (store: any) => {
    const rawDispatch = store.dispatch;
    return (action: any) => {
        if (typeof action.then === 'function') {
            return action.then(rawDispatch);
        }
        return rawDispatch(action);
    };
};

const addLoggingToDispatch = (store: any) => {
    const rawDispatch = store.dispatch;
    return (action: any) => {
        console.group(action.type);
        console.log('prev state', store.getState());
        console.log('action', action);
        const returnValue = rawDispatch(action);
        console.log('next state', store.getState());
        console.groupEnd();
        return returnValue;
    };
};
const configureStore = () => {

    const store = createStore(todoApp);
    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }

    store.dispatch = addPromiseSupportToDispatch(store);

    return store;
};

export default configureStore;
