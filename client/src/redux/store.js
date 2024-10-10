import { createStore } from 'redux';
import leadReducer from './reducers/leadReducer';

const store = createStore(
    leadReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // For Redux DevTools
);

export default store;
