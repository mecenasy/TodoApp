export interface TodosState {
    todos: Todo[];
    filter: string;
}

export interface Todo {
    id: any;
    text: string;
    completed: boolean;
}
