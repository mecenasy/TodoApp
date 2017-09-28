import { take, put, call, fork, takeLatest } from 'redux-saga/effects';
import * as C from './constants';
import * as A from './actions';
import api from '../../api';

export function* counterSaga() {
   yield [
      fork(addCounterSaga),
      fork(removeCounterSaga),
      fork(incrementCounterSaga),
      fork(decrementCounterSaga),
      fork(getCountersSaga),
   ];
}

export function* addCounterSaga() {
   while (true) { // TODO: czy to jest dobre podejście z while true
      const action = yield take(C.ActionType.AddCounter);
      const name = action.name;
      try {
         const res = yield call(api.addCounter, name);
         const data = res.data;
         yield put(A.addCounterSuccess(data.id, data.name, data.count));
      } catch (err) {
         yield put(A.addCounterFail());
      }
   }
}

export function* removeCounterSaga() {
   while (true) {
      const action = yield take(C.ActionType.RemoveCounter);
      try {
         const res = yield call(api.removeCounter, action.id);
         // const data = res.data;
         yield put(A.removeCounterSuccess(action.id)); // TODO: pytanie filozoficzne czy api ma zwracac usuniety obiekt
      } catch (err) {
         yield put(A.removeCounterFail(action.id));
      }
   }
}

export function* incrementCounterSaga() {
   while (true) {
      const action = yield take(C.ActionType.IncrementCount);
      try {
         const res = yield call(api.incrementCounter, action.id);
         const data = res.data;
         yield put(A.incrementCounterSuccess(data.id, data.count));
      } catch (err) {
         yield put(A.incrementCounterFail(action.id));
      }
   }
}

export function* decrementCounterSaga() {
   while (true) {
      const action = yield take(C.ActionType.DecrementCount);
      try {
         const res = yield call(api.decrementCounter, action.id);
         const data = res.data;
         yield put(A.decrementCounterSuccess(data.id, data.count));
      } catch (err) {
         yield put(A.decrementCounterFail(action.id));
      }
   }
}

export function* getCountersSaga() {
   while (true) {
      const action = yield take(C.ActionType.GetCounters);
      try {
         const res = yield call(api.getCounters);
         const data = res.data;
         // yield put(A.decrementCounterSuccess(data.id, data.count));
         for (const counter of data) {
            yield put(A.addCounterSuccess(counter.id, counter.name, counter.count));
         }
      } catch (err) {
         yield put(A.getCountersFail());
      }
   }
}
