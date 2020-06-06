import * as actionTypes from '../actions/actionTypes';
import {defaultColors, darkModeColors} from '../../colors';

const initialState = {
    darkMode : true,
    colorsObj : darkModeColors
};

const appModeReducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.FLIP_DARK_MODE:
            return{
                ...state,
                darkMode: !state.darkMode,
                colorsObj: (state.darkMode) ? defaultColors : darkModeColors
            }        
        default:
            return state;
    }

}

export default appModeReducer;