import { throttle } from 'lodash';
import { createStore } from 'redux';
import todoApp from '../Reducers/';

import { loadState, saveState } from '../Store/storage';
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
    const pres = loadState();
    const store = createStore(todoApp, pres);
    store.subscribe(throttle(() => saveState({ todos: store.getState().todos }), 1000));
    store.dispatch = addLoggingToDispatch(store);
    return store;
};

export default configureStore;
