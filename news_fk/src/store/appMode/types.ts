export interface AppModeState {
  darkMode : boolean,
  colorsObj : any
}

export const FLIP_DARK_MODE = 'FLIP_DARK_MODE';

interface FlipDarkModeAction {
  type: typeof FLIP_DARK_MODE
}

export type AppModeAction = FlipDarkModeAction;