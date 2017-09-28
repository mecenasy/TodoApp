import { countersListReducer } from '../modules/counter/reducers';
import { CountersListState } from '../modules/counter/constants';
// rozważyć taką konstrukcję reducers żeby przepychała część rzeczy z constants i żeby mozna było tutaj zrobić jednego importa na obie te rzeczy

export interface ApplicationState {
   counterApp: CountersListState;
}

export const reducers = {
   counterApp: countersListReducer,
};
