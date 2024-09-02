import { SET_DATA } from './actions.jsx';

const initialState = {
  data: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default dataReducer;
