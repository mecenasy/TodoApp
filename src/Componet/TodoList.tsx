import * as React from 'react';
import { Todo } from '../Types/TodoStore';
import TodoElement from './TodoElement';
interface ITodoList {
    todos: Todo[],
    onTodoClick: (id: any) => void,
}
export default class TodoList extends React.Component<ITodoList, {}> {
    public render() {
        const {
            todos,
            onTodoClick,
        } = this.props;
        console.log(todos);
        return (
            <ul>
                {todos.map((todo: Todo) => <TodoElement key={todo.id} {...todo}  onClick={() => {onTodoClick(todos.indexOf(todo)); }}/>)}
            </ul>
        );
    }
}
