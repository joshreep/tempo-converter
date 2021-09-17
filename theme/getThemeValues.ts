import { ColorSchemeName } from 'react-native'
import COLOR_VALUES from './colorValues'

export type Theme = ReturnType<typeof getThemeValues>

export default function getThemeValues(colorScheme: NonNullable<ColorSchemeName>) {
    const isDark = colorScheme === 'dark'

    return {
        ...COLOR_VALUES,
        colorScheme,
        isDark,
        primaryText: isDark ? COLOR_VALUES.primaryLight : COLOR_VALUES.primaryDark,
        secondaryText: isDark ? COLOR_VALUES.secondaryLight : COLOR_VALUES.secondaryDark,
        textColor: isDark ? COLOR_VALUES.textColorLight : COLOR_VALUES.textColorDark,
    }
}
