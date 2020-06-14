const colors = {
    blue: '#213458',
    white: '#FFF',
    charcoal: '#353C51',
    darkBlue: '#081B33',
    policeBlue: '#152642',
    gray: 'E0E0E0',
    darkGrey: '#121212',
    lightViolet: '#8A2BE2',
    darkOrange: '#FF8C00',
    orchid: '#DA70D6',
    lightYellow: '	#CCCC00',
    blackShade: '#1E1E30',
    lightGray: '#6C757D',
    shadeGray: '#161625',
    black: '#000',
    gainsboro: '#DCDCDC',
    silver: '#C0C0C0'
};

export interface ModeColors {
    backgroundColor: string,
    cardButtonColor: string,
    cardColor: string,
    opacity: number,
    textStyleHigh: Object,
    textStyleMedium: Object,
    textStyleLow: Object,
    navBarStyle: Object
    navItemStyle: Object,
    formColor: string,
    navLinkStyle: Object,
    dropdown: Object
}

export const defaultColors: ModeColors = {
    backgroundColor: colors.white,
    cardButtonColor: colors.silver,
    cardColor: colors.white,
    opacity: 1,
    textStyleHigh: { opacity: 1 },
    textStyleMedium: { opacity: 1 },
    textStyleLow: { opacity: 1 },
    navBarStyle: { backgroundColor: colors.lightGray },
    navItemStyle: {},
    formColor: colors.white,
    navLinkStyle: { color: colors.white, opacity: 1 },
    dropdown: { color: colors.black },
};

export const darkModeColors: ModeColors = {
    backgroundColor: colors.shadeGray,
    cardButtonColor: colors.blackShade,
    cardColor: colors.charcoal,
    opacity: 0.75,
    textStyleHigh: { color: colors.white, opacity: 1 },
    textStyleMedium: { color: colors.white, opacity: 0.8 },
    textStyleLow: { color: colors.white, opacity: 0.38 },
    navBarStyle: { backgroundColor: colors.blackShade },
    navItemStyle: {},
    formColor: colors.lightGray,
    navLinkStyle: { color: colors.lightGray, opacity: 1 },
    dropdown: { color: colors.white },
};