import { takeEvery, delay } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import * as S from '../sagas';
import * as A from '../actions';
import * as C from '../constants';
import api from '../../../api';

describe('Testing Sagas', () => {
   describe('addCounterSaga', () => {
      let addCounterGenerator;
      const addCounterAction = A.addCounter('testName');
      beforeEach(() => {
         addCounterGenerator = S.addCounterSaga();

         const takeDescriptor = addCounterGenerator.next().value;
         expect(takeDescriptor).toEqual(take(C.ActionType.AddCounter));

         const callDescriptor = addCounterGenerator.next(addCounterAction).value;
         expect(callDescriptor).toEqual(call(api.addCounter, addCounterAction.name));
      });

      it('should dispatch addCounterSuccess action if request to api is successfull', () => {
         const responseFromApi = { data: { id: 666, name: 'testName', count: 0 } };
         const putDescriptor = addCounterGenerator.next(responseFromApi).value;

         expect(putDescriptor).toEqual(put(A.addCounterSuccess(666, 'testName', 0)));
      });
      it('should dispatch addCounterFail action if the api returns errors', () => {
         const errorFromApi = new Error('some type of error');
         const putDescriptor = addCounterGenerator.throw(errorFromApi).value;

         expect(putDescriptor).toEqual(put(A.addCounterFail()));
      });
   });

   describe('removeCounterSaga', () => {
      let removeCounterGenerator;
      const removeCounterAction = A.removeCounter(666);
      beforeEach(() => {
         removeCounterGenerator = S.removeCounterSaga();

         const takeDescriptor = removeCounterGenerator.next().value;
         expect(takeDescriptor).toEqual(take(C.ActionType.RemoveCounter));

         const callDescriptor = removeCounterGenerator.next(removeCounterAction).value;
         expect(callDescriptor).toEqual(call(api.removeCounter, removeCounterAction.id));
      });

      it('should dispatch removeCounterSuccess if request is succesfull', () => {
         const putDescriptor = removeCounterGenerator.next().value;
         expect(putDescriptor).toEqual(put(A.removeCounterSuccess(removeCounterAction.id)));
      });

      it('should dispatch removeCounterFail if request failed', () => {
         const putDescriptor = removeCounterGenerator.throw().value;
         expect(putDescriptor).toEqual(put(A.removeCounterFail(removeCounterAction.id)));
      });
   });

   describe('incrementCounterSaga ', () => {
      let incrementCounterGenerator;
      const incrementCounterAction = A.incrementCounter(0);
      beforeEach(() => {
         incrementCounterGenerator = S.incrementCounterSaga();

         const takeDescriptor = incrementCounterGenerator.next().value;
         expect(takeDescriptor).toEqual(take(C.ActionType.IncrementCount));

         const callDescriptor = incrementCounterGenerator.next(incrementCounterAction).value;
         expect(callDescriptor).toEqual(call(api.incrementCounter, incrementCounterAction.id));
      });

      it('should dispatch incrementCounterSuccess if request to api is successfull', () => {
         const responseFromApi = { data: { id: 0, count: 0 } };
         const putDescriptor = incrementCounterGenerator.next(responseFromApi).value;
         expect(putDescriptor).toEqual(put(A.incrementCounterSuccess(responseFromApi.data.id, responseFromApi.data.count)));
      });

      it('should dispatch incrementCounterFail if the api returns errors', () => {
         const errorFromApi = new Error('whatever?');
         const putDescriptor = incrementCounterGenerator.throw(errorFromApi).value;
         expect(putDescriptor).toEqual(put(A.incrementCounterFail(incrementCounterAction.id)));
      });
   });

   describe('decrementCounterSaga', () => {
      let decrementCounterGenerator;
      const decrementCounterAction = A.decrementCounter(0);
      beforeEach(() => {
         decrementCounterGenerator = S.decrementCounterSaga();

         const takeDescriptor = decrementCounterGenerator.next().value;
         expect(takeDescriptor).toEqual(take(C.ActionType.DecrementCount));

         const callDescriptor = decrementCounterGenerator.next(decrementCounterAction).value;
         expect(callDescriptor).toEqual(call(api.decrementCounter, decrementCounterAction.id));
      });

      it('should dispatch incrementCounterSuccess if request to api is successfull', () => {
         const responseFromApi = { data: { id: 0, count: 0 } };
         const putDescriptor = decrementCounterGenerator.next(responseFromApi).value;
         expect(putDescriptor).toEqual(put(A.decrementCounterSuccess(responseFromApi.data.id, responseFromApi.data.count)));
      });

      it('should dispatch incrementCounterFail if the api returns errors', () => {
         const errorFromApi = new Error('whatever?');
         const putDescriptor = decrementCounterGenerator.throw(errorFromApi).value;
         expect(putDescriptor).toEqual(put(A.decrementCounterFail(decrementCounterAction.id)));
      });
   });

   describe('getCounterSaga ', () => {
      let getCounterGenerator;
      const getCountersAction = A.getCounters();
      beforeEach(() => {
         getCounterGenerator = S.getCountersSaga();

         const takeDescriptor = getCounterGenerator.next().value;
         expect(takeDescriptor).toEqual(take(C.ActionType.GetCounters));

         const callDescriptor = getCounterGenerator.next(getCountersAction).value;
         expect(callDescriptor).toEqual(call(api.getCounters));

      });
      it('should dispatch two addCounterSuccess actions', () => {
         const responseFromApi = {
            data: [
               { id: 666, name: 'testName1', count: 44 },
               { id: 999, name: 'testName2', count: 22 },
            ],
         };

         const putDescriptor1 = getCounterGenerator.next(responseFromApi).value;
         const putDescriptor2 = getCounterGenerator.next().value;

         expect(putDescriptor1).toEqual(put(A.addCounterSuccess(666, 'testName1', 44)));
         expect(putDescriptor2).toEqual(put(A.addCounterSuccess(999, 'testName2', 22)));
      });

      it('should dispatch getCountersFail if api calls fails', () => {
         const putDescriptor = getCounterGenerator.throw().value;
         expect(putDescriptor).toEqual(put(A.getCountersFail()));
      });
   });

});
