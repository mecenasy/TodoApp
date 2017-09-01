
export const toggleTodo = (id: number) => {
    return {
        id,
        type: 'TOGGLE_TODO',
    };
};
