import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as action from '../Action/';
import { AddTooAction, ToggleTodoAction } from '../Action/IAction';
import { getVisibileFilter } from '../Reducers';
import { Todo } from '../Types/TodoStore';
import TodoList from './TodoList';

interface IVisivleTodoList {
    todos: Todo[],
    filter: string
    toggleTodo: (id: number) => ToggleTodoAction,
    fetchTodos: any
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
            toggleTodo, ...rest,
        } = this.props;
        return (
            <TodoList {...rest} onTodoClick={toggleTodo} />
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
        todos: getVisibileFilter(state, filter),
    };
};

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         onTodoClick: (id: number) => {
//             dispatch(action.toggleTodo(id));
//         },
//     };
// };

export default withRouter(connect(
    mapsStateToProps, action,
)(VisivleTodoList));
