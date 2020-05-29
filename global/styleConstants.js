import { StyleSheet } from 'react-native';

// The fonts used in the app
const fonts = {
    almaraiLight: 'Almarai-Light',
    almaraiRegular: 'Almarai-Regular',
    almaraiBold: 'Almarai-Bold'
}

// Collection of font sizes to be united and used in the app
const fontSizes = {
    xxSmall: 10,
    xSmall: 12,
    small: 14,
    regular: 16,
    large: 18,
    xLarge: 24,
    xxLarge: 28,
    xxxLarge: 32
}

// Collection of colors to be united and used in the app
const colors = {
    primaryFontColor: '#000000',
    secondaryFontColor: '#363636',
    primaryBackgroundColor: '#ffffff',
    secondaryBackgroundColor: '#e0e0e0',

    accent1: '#8B7FF9',
    accent2: '#8B7FF9',

    highUrgency: '#FF0000',
    mediumUrgency: '#FF8000',
    lowUrgency: '#00FF11'
}

// Global style accessable throught the app
const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: fonts.almaraiRegular,
        fontSize: fontSizes.regular,
        color: colors.primaryFontColor,
    }
});

// const images = {
//     rating: {
//         oneStar: require('../assets/images/rating/1.png'),
//     }
// }

export { fonts, fontSizes, colors, globalStyles }