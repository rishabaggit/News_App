import {
    AppModeState,
    AppModeAction,
    FLIP_DARK_MODE
} from './types';
import {defaultColors, darkModeColors} from '../../colors';
  
const initialState:AppModeState = {
    darkMode : false,
    colorsObj : defaultColors
};

const appModeReducer = (state = initialState, action:AppModeAction) => {
    switch(action.type){
        case FLIP_DARK_MODE:
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