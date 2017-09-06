import { createStore } from 'redux';
import todoApp from '../Reducers/';

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
    store.dispatch = addLoggingToDispatch(store);
    return store;
};

export default configureStore;
