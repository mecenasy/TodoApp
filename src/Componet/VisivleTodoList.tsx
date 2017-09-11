import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as action from '../Action';
// import { ToggleTodoAction } from '../Action/IAction';
// import { Todo } from '../Types/TodoStore';
import FetchError from './FetchError';
import TodoList from './TodoList';
import { getIsFetching, getVisibileFilter, getErrorMessage } from '../Reducers';

interface IVisivleTodoList {
   todos: any,
   filter: any
   toggleTodo: (id: number) => any,
   fetchTodos: any
   isFetching: any
   requestTodos: any
   errorMessage: string
   addTodo: (text: string) => any,
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
         errorMessage,
        } = this.props;
      if (isFetching && !todos.length) {
         return <p>Loading...</p>;
      }
      if (errorMessage && !todos.length) {
         return (
            <FetchError message={errorMessage} onReady={this.fetchDate()} />

         );
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
      errorMessage: getErrorMessage(state, filter),
      todos: getVisibileFilter(state, filter),
   };
};

export default withRouter(connect(
   mapsStateToProps, action,
)(VisivleTodoList));
