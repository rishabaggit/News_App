import * as actionTypes from '../actions/actionTypes';
import { authAction } from 'store/actions/auth';

interface authState {
    userId: string;
    error: string;
    loading: boolean;
}
const initialState: authState = {
    userId: null,
    error: null,
    loading: false,
};

const authReducer = (state = initialState, action: authAction) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                userId: null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                userId: action.userId,
                error: null,
                loading: false,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_REFRESH:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export default authReducer;