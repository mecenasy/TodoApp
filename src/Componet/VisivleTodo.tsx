import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Todo } from '../Types/TodoStore';
import TodoList from './TodoList';
// interface IVisibleTodo {
//     filter: string;
// }
export default class VisivleTodo extends React.Component<{}, {}> {

    public render() {
        return (
            <VisivleTodoList />
        );
    }
}

const toggleTodo = (id: number) => {
    return {
        id,
        type: 'TOGGLE_TdfsdfsdfODO',
    };
};

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

const mapsStateToProps = (state: any, ownProps: any) => {
    return {
        todos: getVisibileFilter(
            state.todos,
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
