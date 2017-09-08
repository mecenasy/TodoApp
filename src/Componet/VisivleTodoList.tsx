import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as action from '../Action/';
import { AddTooAction, ToggleTodoAction } from '../Action/IAction';
import { getIsFetching, getVisibileFilter } from '../Reducers';
import { Todo } from '../Types/TodoStore';
import TodoList from './TodoList';

interface IVisivleTodoList {
    todos: Todo[],
    filter: string
    toggleTodo: (id: number) => ToggleTodoAction,
    fetchTodos: any
    isFetching: boolean
    requestTodos: any
    addTodo: (text: string) => AddTooAction,
}
class VisivleTodoList extends React.Component<IVisivleTodoList, {}> {
    public componentDidMount() {
        this.fetchDate();
    }

    public componentDidUpdate(prevProps: any) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchDate();
        }
    }

    public render() {
        const {
            toggleTodo,
            todos,
            isFetching,
        } = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>;
        }
        return (
            <TodoList todos={todos} onTodoClick={toggleTodo} />
        );
    }
    private fetchDate() {
        const {
            filter,
            fetchTodos,
        } = this.props;
        fetchTodos(filter);
    }
}

const mapsStateToProps = (state: any, ownProps: any) => {
    const filter = ownProps.match.params.filter || 'all';
    return {
        filter,
        isFetching: getIsFetching(state, filter),
        todos: getVisibileFilter(state, filter),
    };
};

export default withRouter(connect(
    mapsStateToProps, action,
)(VisivleTodoList));
