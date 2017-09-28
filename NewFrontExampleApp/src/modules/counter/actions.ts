import * as C from './constants';

// getting counters
export const getCounters = (): C.CounterAction => ({
   type: C.ActionType.GetCounters,
});

// export const getCountersSuccess = (countersList): C.CounterAction => ({
//    type: C.ActionType.GetCountersSuccess,
//    countersList,
// });

export const getCountersFail = (): C.CounterAction => ({
   type: C.ActionType.GetCountersFail,
});

// incrementing and decrementing
export const incrementCounter = (id: number): C.CounterAction => ({
   type: C.ActionType.IncrementCount,
   id,
});

export const incrementCounterSuccess = (id: number, count: number): C.CounterAction => ({
   type: C.ActionType.IncrementCountSuccess,
   id,
   count,
});

export const incrementCounterFail = (id: number): C.CounterAction => ({
   type: C.ActionType.IncrementCountFail,
   id,
});

export const decrementCounter = (id: number): C.CounterAction => ({
   type: C.ActionType.DecrementCount,
   id,
});

export const decrementCounterSuccess = (id: number, count: number): C.CounterAction => ({
   type: C.ActionType.DecrementCountSuccess,
   id,
   count,
});

export const decrementCounterFail = (id: number): C.CounterAction => ({
   type: C.ActionType.DecrementCountFail,
   id,
});

// incrementing and decrementing
export const addCounter = (name: string): C.CounterAction => ({
   type: C.ActionType.AddCounter,
   name,
});

export const addCounterSuccess = (id: number, name: string, count: number): C.CounterAction => ({
   type: C.ActionType.AddCounterSuccess,
   id,
   name,
   count,
});

export const addCounterFail = (): C.CounterAction => ({
   type: C.ActionType.AddCounterFail,
});

export const removeCounter = (id: number): C.CounterAction => ({
   type: C.ActionType.RemoveCounter,
   id,
});

export const removeCounterSuccess = (id: number): C.CounterAction => ({
   type: C.ActionType.RemoveCounterSuccess,
   id,
});

export const removeCounterFail = (id: number): C.CounterAction => ({
   type: C.ActionType.RemoveCounterFail,
   id,
});
