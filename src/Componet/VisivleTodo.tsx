import * as React from 'react';
import { connect } from 'react-redux';
import { Todo } from '../Types/TodoStore';
import TodoList from './TodoList';

interface IVisibleTodo {
    filter: string;
}
export default class VisivleTodo extends React.Component<IVisibleTodo, {}> {

    public render() {
        return (
            <VisivleTodoList filter={this.props.filter}/>
        );
    }
}

const getVisibileFilter = (todos: Todo[], filter: string) => {
    console.log(filter);

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
    };
};

const mapsStateToProps = (state: any, ownProps: any) => {
    return {
        todos: getVisibileFilter(
            state.todos,
            ownProps.filter),
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
