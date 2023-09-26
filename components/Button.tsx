import React, { FC } from 'react'
import { Pressable, PressableProps } from 'react-native'

import styled from 'styled-components/native'
import { Theme } from '../theme/getThemeValues'

export type ButtonProps = PressableProps & {
    inverted?: boolean
    primary?: boolean
    secondary?: boolean
}
type BorderColor = '#00bcd4' | '#8bc34a' | '#000' | '#fff'
type BackgroundColor = '#00bcd4' | '#8bc34a' | 'transparent'

const StyledPressable = styled(Pressable)<ButtonProps>`
    border-style: solid;
    border-color: ${getBorderColor};
    border-width: 2px;
    justify-content: center;
    align-items: center;
    background-color: ${getBackgroundColor};
`

const Button: FC<ButtonProps> = (props) => {
    const { children, ...pressableProps } = props
    return <StyledPressable {...pressableProps}>{children}</StyledPressable>
}

function getBorderColor(props: ButtonProps & { theme: Theme }): BorderColor {
    if (props.primary) return props.theme.primary
    if (props.secondary) return props.theme.secondary
    return props.theme.textColor
}

function getBackgroundColor(props: ButtonProps & { theme: Theme }): BackgroundColor {
    if (props.inverted) return 'transparent'
    if (props.primary) return props.theme.primary
    if (props.secondary) return props.theme.secondary
    return 'transparent'
}

export default Button
