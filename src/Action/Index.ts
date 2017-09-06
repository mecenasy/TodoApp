
export const toggleTodo = (id: number) => {
    return {
        id,
        type: 'TOGGLE_TODO',
    };
};

let nextId = 0;
export const addTodo = (text: string) => {
    return {
        id: nextId++,
        text,
        type: 'ADD_TODO',
    };
};
