import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './reducers';

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware()(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}