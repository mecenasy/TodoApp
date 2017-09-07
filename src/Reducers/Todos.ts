import { combineReducers } from 'redux';
import { ReciveTodosAction } from '../Action/IAction';
import { Todo } from '../Types/TodoStore';

const byId = (state: any, action: ReciveTodosAction) => {
    if (state === undefined) {
        state = {};
    }
    switch (action.type) {
        case 'RECEIVE_TODOS': {
            const nextState = {...state};
            action.response.forEach((todo) => {
                nextState[todo.id] = todo;
            });
            return nextState;
        }
        default: {
            return state;
        }
    }
};

const allIds = (state: any, action: ReciveTodosAction) => {
    if (state === undefined) {
        state = [];
    }
    if (action.filter !== 'all') {
        return state;
    }
    switch (action.type) {
        case 'RECEIVE_TODOS': {
            return action.response.map((todo: Todo) => todo.id);
        }
        default:
            return state;
    }
};

const activeIds = (state: any, action: ReciveTodosAction) => {
    if (state === undefined) {
        state = [];
    }
    if (action.filter !== 'active') {
        return state;
    }
    switch (action.type) {
        case 'RECEIVE_TODOS': {
            return action.response.map((t: Todo) => t.id);
        }
        default:
            return state;
    }
};
const completedIds = (state: any, action: ReciveTodosAction) => {
    if (state === undefined) {
        state = [];
    }
    if (action.filter !== 'completed') {
        return state;
    }
    switch (action.type) {
        case 'RECEIVE_TODOS': {
            return action.response.map((t: Todo) => t.id);
        }
        default:
            return state;
    }
};

const idsByFilter = combineReducers({
    active: activeIds,
    all: allIds,
    completed: completedIds,
});

export const todos = combineReducers({ byId, idsByFilter });

// const getAllTodos = (state: any): Todo[] => state.allIds.map((id: number) => state.byId[id]);

export const getVisibileFilter = (state: any, filter: string) => {
    const ids = state.idsByFilter[filter];
    return ids.map((id: number) => state.byId[id]);
    // const allTodos = getAllTodos(state);
    // switch (filter) {
    //     case 'all':
    //         return allTodos;
    //     case 'completed':
    //         return allTodos.filter((t: Todo) => t.completed);
    //     case 'active':
    //         return allTodos.filter((t: Todo) => !t.completed);
    //     default:
    //         throw new Error(`Unknow filter ${filter}`);
    // }
};
