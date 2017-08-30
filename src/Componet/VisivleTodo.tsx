import * as React from 'react';
import { connect } from 'react-redux';
import { Todo } from '../Types/TodoStore';
import TodoList from './TodoList';

export default class VisivleTodo extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <VisivleTodoList />
            </div>

        );
    }
}

const getVisibileFilter = (todos: Todo[], filter: string) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLITED':
            return todos.filter((t: Todo) => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter((t: Todo) => !t.completed);
    }
    return todos;
};

const toggleTodo = (id: number) => {
    return {
        id,
        type: 'TOGGLE_TODO',
    };
};

const mapsStateToProps = (state: any) => {
    return {
        todos: getVisibileFilter(
            state.todos,
            state.filter),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onTodoClick: (id: number) => {
            dispatch(toggleTodo(id));
        },
    };
};

const VisivleTodoList = connect(
    mapsStateToProps,
    mapDispatchToProps,
)(TodoList);
