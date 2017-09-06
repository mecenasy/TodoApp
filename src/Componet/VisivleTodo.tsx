import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../Action/';
import { getVisibileFilter } from '../Reducers';
import TodoList from './TodoList';

export default class VisivleTodo extends React.Component<{}, {}> {
    public render() {
        return (
            <VisivleTodoList />
        );
    }
}

const mapsStateToProps = (state: any, ownProps: any) => {
    return {
        todos: getVisibileFilter(state, ownProps.match.params.filter || 'all'),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onTodoClick: (id: number) => {dispatch(toggleTodo(id));
        },
    };
};

const VisivleTodoList = withRouter(connect(
    mapsStateToProps, mapDispatchToProps,
)(TodoList));
