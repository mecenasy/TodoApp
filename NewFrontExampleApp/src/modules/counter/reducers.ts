import * as C from './constants';

export const countersListReducer = (state = C.countersListInitialState, action: C.CounterAction): C.CountersListState => {
   const { type, count, name, id } = action;
   switch (type) {
      case C.ActionType.AddCounter:
      case C.ActionType.AddCounterFail:
         return state; // tu się powinno dziać coś odnośnie loadera, że coś się dzieje, ale ignorujemy ten przypadek na razie (wymaga refactoru i dodania pola dla całego modelu CountersListState)
      case C.ActionType.AddCounterSuccess:
         return [
            ...state,
            singleCounterReducer(undefined, action),
         ];
      case C.ActionType.RemoveCounterSuccess:
         return state.filter(item => item.id !== id);
      // all actions that should just be passed down to the underlying reducer
      case C.ActionType.RemoveCounter:
      case C.ActionType.RemoveCounterFail:
      case C.ActionType.IncrementCount:
      case C.ActionType.IncrementCountSuccess:
      case C.ActionType.IncrementCountFail:
      case C.ActionType.DecrementCount:
      case C.ActionType.DecrementCountSuccess:
      case C.ActionType.DecrementCountFail:
         return state.map(item => singleCounterReducer(item, action));
      default:
         return state;
   }
};

export const singleCounterReducer = (state = C.singleCounterInitialState, action: C.CounterAction): C.SingleCounterState => {
   const { type, count, name, id } = action;
   switch (type) {
      // case C.ActionType.AddCounter:
      //    return {
      //       id: -1,
      //       name,
      //       count: state.count,
      //       actionPending: true,
      //    };
      case C.ActionType.AddCounterSuccess:
         return {
            id,
            name,
            count,
         };

      case C.ActionType.RemoveCounter:
         if (id === state.id) {
            return {
               ...state,
               actionPending: true,
            };
         } else {
            return state;
         }
      case C.ActionType.RemoveCounterFail:
         if (id === state.id) {
            return {
               ...state,
               actionPending: false,
            };
         } else {
            return state;
         }
      case C.ActionType.IncrementCount:
         if (id === state.id) {
            return {
               ...state,
               count: state.count + 1,
               actionPending: true,
            };
         } else {
            return state;
         }

      case C.ActionType.DecrementCount:
         if (id === state.id) {
            return {
               ...state,
               count: state.count - 1,
               actionPending: true,
            };
         } else {
            return state;
         }

      case C.ActionType.IncrementCountSuccess:
      case C.ActionType.DecrementCountSuccess:
         if (id === state.id) {
            return {
               ...state,
               count,
               actionPending: false,
            };
         } else {
            return state;
         }

      case C.ActionType.IncrementCountFail:
         if (id === state.id) {
            return {
               ...state,
               count: state.count - 1,
               actionPending: false,
            };
         } else {
            return state;
         }

      case C.ActionType.DecrementCountFail:
         if (id === state.id) {
            return {
               ...state,
               count: state.count + 1,
               actionPending: false,
            };
         } else {
            return state;
         }

      default:
         return state;
   }
};
