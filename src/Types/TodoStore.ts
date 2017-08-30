export interface TodosState {
    todos: Todo[];
    filter: string;
}

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}
