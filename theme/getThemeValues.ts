import { ColorSchemeName } from 'react-native'

export type Theme = ReturnType<typeof getThemeValues>

export default function getThemeValues(colorScheme: NonNullable<ColorSchemeName>) {
    const isDark = colorScheme === 'dark'

    return {
        textColor: isDark ? '#fff' : '#000',
        textColorLight: '#fff',
        textColorDark: '#000',
        primary: '#00bcd4',
        primaryLight: '#62efff',
        primaryDark: '#008ba3',
        secondary: '#8bc34a',
        secondaryLight: '#bef67a',
        secondaryDark: '#5a9216',
    }
}
