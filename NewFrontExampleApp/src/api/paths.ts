const protocol = 'http://';
const host = 'localhost';
const port = ':3000';
const basePath = [protocol, host, port].join('');

// function param(name?: string) {
//    return {
//       __pathParam: true,
//       name,
//    };
// }

// export const countersList = [...basePath, '/counters'];
// export const counter = [...countersList, '/', param()];
// export const incrementCounter = [...counter, '/increment'];
// export const decrementCounter = [...counter, '/decrement'];

export const countersList = basePath + '/counters';
export const counter = countersList + '/:id';
export const incrementCounter = counter + '/increment';
export const decrementCounter = counter + '/decrement';
