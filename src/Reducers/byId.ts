// import { FetchTodosSuccessAction, AddTodoSuccessAction } from '../Action/IAction';
// type KnowAction = FetchTodosSuccessAction | AddTodoSuccessAction;

export const byId = (state: any, action: any) => {
   if (state === undefined) {
      state = {};
   }
   if (action.response) {
      return { ...state, ...action.response.entities.todos };
   }
   return state;
};

export const getTodo = (state: any, id: number) => state[id];
