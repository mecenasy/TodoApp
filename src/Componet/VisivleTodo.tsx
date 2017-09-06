import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../Action/';
import { fetchTodos } from '../Api';
import { getVisibileFilter } from '../Reducers';
import TodoList, { ITodoList } from './TodoList';
class VisivleTodoList extends React.Component<ITodoList, {}> {
    public componentDidMount() {
        this.fetchDate();
    }

    public componentDidUpdate(prevProps: any) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchDate();
        }
    }

    public render() {
        return (
            <TodoList {...this.props} />
        );
    }
    private fetchDate() {
        fetchTodos(this.props.filter).then((todos) =>
            console.log(this.props.filter, todos));
    }
}

const mapsStateToProps = (state: any, ownProps: any) => {
    const filter = ownProps.match.params.filter || 'all';
    return {
        filter,
        todos: getVisibileFilter(state, filter),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onTodoClick: (id: number) => {
            dispatch(toggleTodo(id));
        },
    };
};

export default withRouter(connect(
    mapsStateToProps, mapDispatchToProps,
)(VisivleTodoList));
