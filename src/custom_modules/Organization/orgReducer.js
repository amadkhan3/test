import { GET_ORGANIZATION_LIST, GET_ORGANIZATION_LIST_SUCCESS, GET_ORGANIZATION_LIST_FAIL } from '../../modules/constants';
import { createNotification } from '../../modules/notificationManager';

// default initial state
const initialState = {
    organizatins: [],
    isLoading: false,
    errors: null
}

// ------------------------------------
// Action handler methods
// ------------------------------------
const orgainzationReducer = (state = initialState, action) => {
    console.log(action, 'dashboard data request');
    switch (action.type) {
        case GET_ORGANIZATION_LIST:
            return {
                ...state, isLoading: true
            }
        case GET_ORGANIZATION_LIST_SUCCESS:
            return {
                ...state, isLoading: false, organizatins: action.payload
            }
        case GET_ORGANIZATION_LIST_FAIL:
            return {
                ...state, isLoading: false, errors: action.payload

            }
        default:
            return state
    };
}
export default orgainzationReducer;

