import * as actionTypes from '../actions/actionTypes';

const initialState = {
    
}

const authReducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state
            } 
        case actionTypes.AUTH_FAIL:
            return{
                ...state
            }
        
        default:
            return state;
    }
}

export default authReducer;