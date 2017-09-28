import {singleCounterReducer, countersListReducer} from '../reducers';
import * as C from '../constants';

describe('Counter app reducers', () => {
   it('should set new value of default counter on inc/dec success', () => {
      const actionInc = {
         type: C.ActionType.IncrementCountSuccess,
         count: 100,
         id: 0,
      };
      const actionDec = {
         type: C.ActionType.DecrementCountSuccess,
         count: 200,
         id: 0,
      };

      expect(singleCounterReducer(undefined, actionInc)).toEqual({
         id: 0,
         name: '',
         count: 100,
         actionPending: false,
      });
      expect(singleCounterReducer(undefined, actionDec)).toEqual({
         id: 0,
         name: '',
         count: 200,
         actionPending: false,
      });
   });

   it('should make optimistic inc/dec and rollback it on fail', () => {
      const countersListState = [
         {
            id: 0,
            name: '',
            count: 5,
         },
         {
            id: 1,
            name: 'counter of interest',
            count: 10,
         },
      ];
      const actionReq = {
         type: C.ActionType.IncrementCount,
         id: 1,
      };
      const actionFail = {
         type: C.ActionType.IncrementCountFail,
         id: 1,
      };
      const actionReq2 = {
         type: C.ActionType.DecrementCount,
         id: 1,
      };
      const actionFail2 = {
         type: C.ActionType.DecrementCountFail,
         id: 1,
      };

      const newState = countersListReducer(countersListState, actionReq);
      expect(newState[1].count).toEqual(11);
      expect(newState[0].count).toEqual(5);
      const newState2 = countersListReducer(newState, actionFail);
      expect(newState2[1].count).toEqual(10);
      expect(newState2[0].count).toEqual(5);
      const newState3 = countersListReducer(countersListState, actionReq2);
      expect(newState3[1].count).toEqual(9);
      expect(newState3[0].count).toEqual(5);
      const newState4 = countersListReducer(newState3, actionFail2);
      expect(newState4[1].count).toEqual(10);
      expect(newState4[0].count).toEqual(5);
   });

   it('should set loading flag on given counter', () => {
      const countersListState = [
         {
            id: 0,
            name: '',
            count: 5,
         },
         {
            id: 1,
            name: 'counter of interest',
            count: 10,
         },
      ];
      const actionReq = {
         type: C.ActionType.IncrementCount,
         id: 1,
      };
      const actionFail = {
         type: C.ActionType.IncrementCountFail,
         id: 1,
      };
      const actionReq2 = {
         type: C.ActionType.DecrementCount,
         id: 1,
      };
      const actionFail2 = {
         type: C.ActionType.DecrementCountFail,
         id: 1,
      };

      const newState = countersListReducer(countersListState, actionReq);
      expect(newState[1].actionPending).toBeTruthy();
      expect(newState[0].actionPending).toBeFalsy();
      const newState2 = countersListReducer(newState, actionFail);
      expect(newState2[1].actionPending).toBeFalsy();
      expect(newState2[0].actionPending).toBeFalsy();
      const newState3 = countersListReducer(countersListState, actionReq2);
      expect(newState3[1].actionPending).toBeTruthy();
      expect(newState3[0].actionPending).toBeFalsy();
      const newState4 = countersListReducer(newState3, actionFail2);
      expect(newState4[1].actionPending).toBeFalsy();
      expect(newState4[0].actionPending).toBeFalsy();
   });

   it('should set new value of counter with given id on inc/dec success', () => {
      const countersListState = [
         {
            id: 0,
            name: '',
            count: 5,
         },
         {
            id: 1,
            name: 'counter of interest',
            count: 10,
         },
      ];
      const actionInc = {
         type: C.ActionType.IncrementCountSuccess,
         id: 1,
         count: 666,
      };
      const actionDec = {
         type: C.ActionType.DecrementCountSuccess,
         id: 0,
         count: -666,
      };

      const newState = countersListReducer(countersListState, actionInc);
      expect(newState[1].count).toEqual(666);
      expect(newState[0].count).toEqual(5);
      const newState2 = countersListReducer(newState, actionDec);
      expect(newState2[1].count).toEqual(666);
      expect(newState2[0].count).toEqual(-666);
   });

   it('should do nothing if unknown action is given', () => {
      const state = [
         {
            id: 0,
            name: '',
            count: 5,
         },
         {
            id: 1,
            name: 'one',
            count: 10,
         },
      ];
      const action = {
         type: '___UNKNOWN_ACTION',
      };
      expect(countersListReducer(state, action as any)).toEqual(state);
      expect(singleCounterReducer(state[0], action as any)).toEqual(state[0]);
   });

   it('should return default state', () => {
      expect(countersListReducer(undefined, {} as any)).toMatchSnapshot();
      expect(singleCounterReducer(undefined, {} as any)).toMatchSnapshot();
   });
});
