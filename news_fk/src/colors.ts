const colors = {
    blue:'#213458',
    white: '#FFF',
    charcoal: '#353C51',
    darkBlue: '#081B33',
    policeBlue: '#152642',
    gray: 'E0E0E0',
    darkGrey: '#121212',
    lightViolet: '#8A2BE2',
    darkOrange: '#FF8C00',
    orchid: '#DA70D6',
    lightYellow : '	#CCCC00'
};

export const defaultColors = {
    backgroundColor: colors.white,
    cardButtonColor: colors.darkOrange,
    cardColor: colors.white,
    opacity: 1,
    textStyleHigh : {opacity: 1},
    textStyleMedium : {opacity: 1},
    textStyleLow : {opacity: 1},
    navBarStyle : {backgroundColor: colors.lightYellow},
    navItemStyle: {},
    formColor: colors.white
};

export const darkModeColors = {
    backgroundColor: colors.darkGrey,
    cardButtonColor: colors.lightViolet,
    cardColor: colors.charcoal,
    opacity: 0.75,
    textStyleHigh : {color: colors.white, opacity: 0.87},
    textStyleMedium : {color: colors.white,opacity: 0.6},
    textStyleLow : {color: colors.white,opacity: 0.38},
    navBarStyle : {backgroundColor: colors.orchid},
    navItemStyle: {},
    formColor: colors.charcoal
};