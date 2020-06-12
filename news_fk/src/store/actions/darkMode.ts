import * as actionTypes from './actionTypes';

export const flipDarkMode = () => {
    return {
        type: actionTypes.FLIP_DARK_MODE
    };
};

interface flipDarkModeAction {
    type: typeof actionTypes.FLIP_DARK_MODE;
};

export type appModeAction = flipDarkModeAction;