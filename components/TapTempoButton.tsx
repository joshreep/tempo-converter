import React, { FC, useState } from 'react'

import { GestureResponderEvent, Text } from 'react-native'
import styled from 'styled-components'

import Button, { ButtonProps } from './Button'

const StyledButton = styled(Button)`
    margin: 20px;
    padding: 35px;
    border-radius: 50000px;
    min-height: 130px;
    min-width: 130px;
`
const ButtonText = styled(Text)<{ inverted: boolean }>`
    font-size: 24px;
    color: ${({ theme, inverted }) => (inverted ? theme.primaryDark : theme.textColorDark)};
`

export type TapTempoButtonProps = ButtonProps

const TapTempoButton: FC<TapTempoButtonProps> = (props) => {
    const [active, setActive] = useState(false)

    const handleOnPressIn = (event: GestureResponderEvent) => {
        setActive(true)
        props.onPressIn?.(event)
    }

    const handleOnPressOut = (event: GestureResponderEvent) => {
        setActive(false)
        props.onPressOut?.(event)
    }

    return (
        <StyledButton {...props} onPressIn={handleOnPressIn} onPressOut={handleOnPressOut} inverted={!active} primary>
            <ButtonText inverted={!active}>TAP</ButtonText>
        </StyledButton>
    )
}

export default TapTempoButton
