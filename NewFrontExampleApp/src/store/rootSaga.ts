import { fork } from 'redux-saga/effects';
import { counterSaga } from '../modules/counter/sagas';

export function* rootSaga() {
   yield fork(counterSaga);
}
