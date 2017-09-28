import * as paths from './paths';
import req from './apiProxy';

// TODO: DELETE
// TODO: tylko tak sie chciało zaimportowac
// a w ogole to gowniana ta biblioteka bo sie gubi na porcie :3000 traktuje jako parametr xD 490 xD
const pathParams = require('path-params');
const p = pathParams.pathParams;
// ENDTODO: DELETE

// TODO: TO MOVE helper
const replaceParam = (toReplace) => (path, replaceWith) => {
   return path.replace(toReplace, replaceWith.toString());
};

const replaceId = replaceParam(':id');
// ENDTODO: TO MOVE helper

export function addCounter(name: string) {
   return req.post(paths.countersList, {
      name,
      count: 0, // TODO: who should be responsible for adding the count to the object? probably server?
   });
}
export function incrementCounter(id: number) {
   // return req.put(p(paths.incrementCounter, {id}));
   return req.patch(replaceId(paths.incrementCounter, id));
}

export function decrementCounter(id: number) {
   return req.patch(replaceId(paths.decrementCounter, id));
}

export function removeCounter(id: number) {
   // return req.delete(p(paths.counter, {id}));
   return req.delete(replaceId(paths.counter, id));
}

export function getCounters() {
   return req.get(paths.countersList);
}
