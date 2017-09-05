import { throttle } from 'lodash';
import { createStore } from 'redux';
import todoApp from '../Reducers/AppReducers';
import { loadState, saveState } from '../Store/storage';

const configureStore = () => {
    const pres = loadState();
    const store = createStore(todoApp, pres);
    store.subscribe(throttle(() => saveState({ todos: store.getState().todos }), 1000));
    return store;
};

export default configureStore;
