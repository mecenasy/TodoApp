import { FetchTodosSuccessAction } from '../Action/IAction';

export const byId = (state: any, action: FetchTodosSuccessAction) => {
    if (state === undefined) {
        state = {};
    }
    switch (action.type) {
        case 'FETCH_TODOS_SUCCESS':
            const nextState = { ...state };
            action.response.forEach((todo) => { nextState[todo.id] = todo; });
            return nextState;
        default:
            return state;
    }
};

export const getTodo = (state: any, id: number) => state[id];
