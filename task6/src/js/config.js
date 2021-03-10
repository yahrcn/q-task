import {createStore} from 'redux';
import {initialState} from './myRedux/initialState';
import {rootReducer} from './myRedux/reducers';

export const store = createStore(rootReducer, initialState);
