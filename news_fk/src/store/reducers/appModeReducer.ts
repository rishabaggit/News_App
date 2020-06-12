import * as actionTypes from '../actions/actionTypes';
import {defaultColors, darkModeColors, ModeColors} from '../../colors';
import {appModeAction} from '../actions/darkMode'
import { analytics } from 'components/UserAuthentication/firebase';

interface appModeState{
    darkMode: boolean;
    colorsObj: ModeColors;
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