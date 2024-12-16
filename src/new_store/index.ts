import { applyMiddleware, combineReducers, createStore } from 'redux';
import { adgroupsReducer } from './adgroup';
import { thunk } from 'redux-thunk';


// 根reducer
const rootReducer = combineReducers({
  adgroups: adgroupsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

//根store
const rootStore = createStore(rootReducer, applyMiddleware(thunk));

export default rootStore;
