import { SET_LEADS } from '../actions/leadActions';

const initialState = {
    leads: [],
};

const leadReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LEADS:
            return {
                ...state,
                leads: action.payload,
            };
        default:
            return state;
    }
};

export default leadReducer;
