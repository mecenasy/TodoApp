export const loadState = () => {
    try {
        const serializeState = localStorage.getItem('state3');
        if (serializeState === null) {
            return undefined;
        }
        return JSON.parse(serializeState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: any) => {
    try {
        const serializeState = JSON.stringify(state);
        localStorage.setItem('state3', serializeState);
    } catch (err) {
        // Ignore write errors
    }
};
