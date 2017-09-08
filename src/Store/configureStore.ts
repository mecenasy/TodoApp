import { applyMiddleware, createStore } from 'redux';
// import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { todos } from '../Reducers/';

<<<<<<< HEAD
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
=======
// const thank = (store: any) => (next: any) => (action: any) => {
//     console.log(store);
//     // console.log(next);
//     // console.log(action);
//     typeof action === 'function' ? action(store.dispatrch) : next(action);
// };
>>>>>>> ad897dab52098e80bd4965a679b58e395b13fe57

const configureStore = () => {
    const middlewares = [thunk];
    // if (process.envds.NODE_ENV !== 'production') {
    //     middlewares.push(createLogger());
    // }
    const store = createStore(todos, applyMiddleware(...middlewares));
    return store;
};

export default configureStore;
