import * as actionTypes from '../actions/actionTypes';
import {defaultColors, darkModeColors} from '../../colors';
import {appModeAction} from '../actions/darkMode'

interface appModeState{
    darkMode: boolean;
    colorsObj: any;
}

const initialState: appModeState = {
    darkMode : false,
    colorsObj : defaultColors
};

const appModeReducer = (state:appModeState = initialState, action: appModeAction) => {
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