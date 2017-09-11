export interface TodosState {
    todos: Todo[];
    filter: string;
}
export interface Todos {
    todos: Todo[];
}

export interface Todo {
    id: any;
    text: string;
    completed: boolean;
}
