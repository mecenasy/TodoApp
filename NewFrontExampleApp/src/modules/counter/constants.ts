export interface SingleCounterState {
   id: number;
   name: string;
   count: number;
   actionPending?: boolean;
}

export type CountersListState = SingleCounterState[];

export const singleCounterInitialState = { id: 0, count: 0, name: '' } as SingleCounterState;
// TODO: arek, o taką wersje walczy linter
// export const singleCounterInitialState2: SingleCounterState = { id: 0, count: 0, name: '' };
export const countersListInitialState = [] as CountersListState;

export enum ActionType {
   GetCounters = 'counterApp/GET_COUNTERS',
   // GetCountersSuccess = 'counterApp/GET_COUNTERS_SUCCESS',
   GetCountersFail = 'counterApp/GET_COUNTERS_FAIL',
   IncrementCount = 'counterApp/INCREMENT_COUNT',
   IncrementCountSuccess = 'counterApp/INCREMENT_COUNT_SUCCESS',
   IncrementCountFail = 'counterApp/INCREMENT_COUNT_FAIL',
   DecrementCount = 'counterApp/DECREMENT_COUNT',
   DecrementCountSuccess = 'counterApp/DECREMENT_COUNT_SUCCESS',
   DecrementCountFail = 'counterApp/DECREMENT_COUNT_FAIL',
   AddCounter = 'counterApp/ADD_COUNTER',
   AddCounterSuccess = 'counterApp/ADD_COUNTER_SUCCESS',
   AddCounterFail = 'counterApp/ADD_COUNTER_FAIL',
   RemoveCounter = 'counterApp/REMOVE_COUNTER',
   RemoveCounterSuccess = 'counterApp/REMOVE_COUNTER_SUCCESS',
   RemoveCounterFail = 'counterApp/REMOVE_COUNTER_FAIL',
}

export interface CounterAction {
   type: ActionType;
   id?: number;
   count?: number;
   name?: string;
}
