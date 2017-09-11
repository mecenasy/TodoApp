import { v4 } from 'node-uuid';
import { Todo, Todos } from '../Types/TodoStore';
const cos: Todo[] = [{
   completed: true,
   id: v4(),
   text: 'hey',
}, {
   completed: true,
   id: v4(),
   text: 'ho',
}, {
   completed: false,
   id: v4(),
   text: 'let’s go',
}];

const fakeDatabase: Todos = {todos: cos};
export const addTodo = (text: string) =>
   delay(500).then(() => {
      const todo = {
         completed: false,
         id: v4(),
         text,
      };
      fakeDatabase.todos.push(todo);
      return todo;
   });

export const toggleTodo = (id: any) =>
   delay(500).then(() => {
      const todo = fakeDatabase.todos.find((t) => t.id === id);
      if (todo !== undefined) {
         todo.completed = !todo.completed;
      }
      return todo;
   });

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTodos = (filter: string) =>
   delay(500).then(() => {
      switch (filter) {
         case 'all':
            return fakeDatabase.todos;
         case 'completed':
            return fakeDatabase.todos.filter((t: Todo) => t.completed);
         case 'active':
            return fakeDatabase.todos.filter((t: Todo) => !t.completed);
         default:
            throw new Error(`Unknow filter: ${filter}`);
      }
   });
