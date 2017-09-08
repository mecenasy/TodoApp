import { ReciveTodosAction } from '../Action/IAction';

export const byId = (state: any, action: ReciveTodosAction) => {
    if (state === undefined) {
        state = {};
    }
    switch (action.type) {
        case 'RECEIVE_TODOS':
            const nextState = { ...state };
            action.response.forEach((todo) => { nextState[todo.id] = todo; });
            return nextState;
        default:
            return state;
    }
};

export const getTodo = (state: any, id: number) => state[id];
