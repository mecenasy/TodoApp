import {  Reducer } from 'redux';

interface SetVisibilityFilterAction {
    type: 'SET_VISIBILITY_FILTER',
    id: number,
    filter: string,
}

export const filter: Reducer<string> = (state = 'SHOW_ALL', action: SetVisibilityFilterAction) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};
