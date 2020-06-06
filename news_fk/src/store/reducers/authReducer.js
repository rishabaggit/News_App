import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: null,
    error: null,
    loading: false,
    redirect_after_login : false
};

const authReducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                error : null,
                loading: true
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                userId: null 
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                userId: action.userId,
                error: null,
                loading: false,
                redirect_after_login : true
            } 
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_REDIRECT_TOGGLE:
            return {
                ...state,
                redirect_after_login: action.redirect_after_login
            }
        default:
            return state;
    }
}

export default authReducer;