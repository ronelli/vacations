import { combineReducers, createStore } from 'redux';
import { userReducer } from "./UserState";
import { vacationsReducer } from './VacationState';

const reducers = combineReducers({vacationsState: vacationsReducer, UserState: userReducer});
const store = createStore(reducers);

export default store;