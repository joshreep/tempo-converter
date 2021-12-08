import React, { FC } from 'react'
import {
    Text as DefaultText,
    View as DefaultView,
    TextInput as DefaultTextInput,
    KeyboardAvoidingView as DefaultKeyboardAvoidingView,
} from 'react-native'
import { Picker as DefaultPicker } from '@react-native-community/picker'
import {
    PickerProps as DefaultPickerProps,
    PickerItemProps as DefaultPickerItemProps,
} from '@react-native-community/picker/typings/Picker'
import { MaterialIcons as DefaultMaterialIcons } from '@expo/vector-icons'
import { IconProps as DefaultIconProps } from '@expo/vector-icons/build/createIconSet'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
    const theme = useColorScheme()
    const colorFromProps = props[theme]

    if (colorFromProps) {
        return colorFromProps
    } else {
        return Colors[theme][colorName]
    }
}

type ThemeProps = {
    lightColor?: string
    darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props'] & { opacity?: number }
export type KeyboardAvoidingViewProps = ThemeProps & DefaultKeyboardAvoidingView['props'] & { opacity?: number }
export type TextInputProps = ThemeProps & DefaultTextInput['props']
export type PickerProps = ThemeProps & DefaultPickerProps
export type PickerItemProps = ThemeProps & DefaultPickerItemProps
export type IconProps = ThemeProps & DefaultIconProps<keyof typeof DefaultMaterialIcons['glyphMap']>

interface PickerComposition {
    Item: FC<PickerItemProps>
}

export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...otherProps } = props
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function View(props: ViewProps) {
    const { style, lightColor, darkColor, opacity, ...otherProps } = props
    let backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

    if (opacity) {
        backgroundColor += percentageToHex(opacity)
    }

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function KeyboardAvoidingView(props: KeyboardAvoidingViewProps) {
    const { style, lightColor, darkColor, opacity, ...otherProps } = props
    let backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

    if (opacity) {
        backgroundColor += percentageToHex(opacity)
    }

    return <DefaultKeyboardAvoidingView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function TextInput(props: TextInputProps) {
    const { style, lightColor, darkColor, ...otherProps } = props
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
    const placeholderColor = color + percentageToHex(25)

    return <DefaultTextInput style={[{ color }, style]} placeholderTextColor={placeholderColor} {...otherProps} />
}

export const Picker: FC<PickerProps> & PickerComposition = (props) => {
    const { style, lightColor, darkColor, ...otherProps } = props
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return <DefaultPicker style={[{ color }, style]} itemStyle={[{ color }]} {...otherProps} />
}

const PickerItem: FC<PickerItemProps> = (props) => {
    const { lightColor, darkColor, ...otherProps } = props
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return <DefaultPicker.Item color={color} {...otherProps} />
}

Picker.Item = PickerItem

export function MaterialIcons(props: IconProps) {
    const { style, lightColor, darkColor, ...otherProps } = props
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return <DefaultMaterialIcons style={[{ color }, style]} {...otherProps} />
}

function percentageToHex(percentage: number) {
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100)
    // const clampedNumber = Math.min(Math.max(percentage, 0), 255)
    const numberValue = Math.round((clampedPercentage / 100) * 255)

    return numberValue.toString(16)
}
