import { createStore } from 'redux';
import dataReducer from './reducer.jsx';

const store = createStore(dataReducer);

export default store;
