import { ButtonProps } from './Button'
import React, { FC, useState } from 'react'
import { GestureResponderEvent } from 'react-native'
import { ButtonText, StyledButton } from './TapTempoButtom.styles'

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
            <ButtonText $inverted={!active}>TAP</ButtonText>
        </StyledButton>
    )
}

export default TapTempoButton
