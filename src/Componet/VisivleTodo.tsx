import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getVisibileFilter } from '../Reducers';
import TodoList from './TodoList';

export default class VisivleTodo extends React.Component<{}, {}> {

    public render() {
        return (
            <VisivleTodoList />
        );
    }
}

<<<<<<< HEAD
const getVisibileFilter = (todos: Todo[], filter: string) => {
    switch (filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter((t: Todo) => t.completed);
        case 'active':
            return todos.filter((t: Todo) => !t.completed);

    }
    return todos;
};

const toggleTodo = (id: number) => {
    return {
        id,
        type: 'TOGGLE_TODO',
=======
const toggleTodo = (id: number) => {
    return {
        id,
        type: 'TOGGLE_TdfsdfsdfODO',
>>>>>>> 2e0ac3e63f2ce39e953a8570da7018d684389518
    };
};

const mapsStateToProps = (state: any, ownProps: any) => {
    return {
        todos: getVisibileFilter(
            state,
            ownProps.match.params.filter || 'all'),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onTodoClick: (id: number) => {
            dispatch(toggleTodo(id));
        },
    };
};

const VisivleTodoList = withRouter(connect(
    mapsStateToProps,
    mapDispatchToProps,
)(TodoList));
