import React, { FC } from 'react'
import { Pressable, PressableProps } from 'react-native'

import styled from 'styled-components'
import { Theme } from '../theme/getThemeValues'

const StyledPressable = styled(Pressable)<ButtonProps>`
    border-style: solid;
    border-color: ${(props) => getBorderColor(props)};
    border-width: 2px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => getBackgroundColor(props)};
`

export type ButtonProps = PressableProps & {
    inverted?: boolean
    primary?: boolean
    secondary?: boolean
}

const Button: FC<ButtonProps> = (props) => {
    const { children, ...pressableProps } = props
    return <StyledPressable {...pressableProps}>{children}</StyledPressable>
}

export default Button

function getBorderColor(props: ButtonProps & { theme: Theme }) {
    if (props.primary) return props.theme.primary
    if (props.secondary) return props.theme.secondary
    return props.theme.textColor
}

function getBackgroundColor(props: ButtonProps & { theme: Theme }) {
    if (props.inverted) return 'transparent'
    if (props.primary) return props.theme.primary
    if (props.secondary) return props.theme.secondary
    return 'transparent'
}
