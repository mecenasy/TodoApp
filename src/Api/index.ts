import { v4 } from 'node-uuid';
import { Todo } from '../Types/TodoStore';
const fakeDatabase: Todo[] = [{
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTodos = (filter: string) =>
    delay(500).then(() => {
        if (Math.random() < 0.5) {
            throw new Error('Ups wyjebało się');
        }
        console.log(Math.random());
        switch (filter) {
            case 'all':
                return fakeDatabase;
            case 'completed':
                return fakeDatabase.filter((t: Todo) => t.completed);
            case 'active':
                return fakeDatabase.filter((t: Todo) => !t.completed);
            default:
                 throw new Error(`Unknow filter: ${filter}`);
        }
    });
