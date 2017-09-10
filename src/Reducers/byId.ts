import { FetchTodosSuccessAction, AddTodoSuccessAction } from '../Action/IAction';
type KnowAction = FetchTodosSuccessAction | AddTodoSuccessAction;

export const byId = (state: any, action: KnowAction) => {
   if (state === undefined) {
      state = {};
   }
   switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
         const nextState = { ...state };
         action.response.forEach((todo) => { nextState[todo.id] = todo; });
         return nextState;
      case 'ADD_TODO_SUCCESS':
         return  { ...state , [action.response.id]: action.response};
      default:
         return state;
   }
};

export const getTodo = (state: any, id: number) => state[id];
