export const SET_LEADS = 'SET_LEADS';

// Action creator to set leads
export const setLeads = (leads) => {
    return {
        type: SET_LEADS,
        payload: leads,
    };
};
