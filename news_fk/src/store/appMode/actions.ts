import {FLIP_DARK_MODE, AppModeAction} from './types';

export const flipDarkMode = ():AppModeAction => {
    return {
        type: FLIP_DARK_MODE
    };
};