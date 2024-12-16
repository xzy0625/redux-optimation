import { applyMiddleware, combineReducers, createStore } from 'redux';
import { counter } from './counter';
import { thunk } from 'redux-thunk';

// 根reducer
const rootReducer = combineReducers({
  counter,
});

export type RootState = ReturnType<typeof rootReducer>

//根store
const rootStore = createStore(rootReducer, applyMiddleware(thunk));

export default rootStore;
