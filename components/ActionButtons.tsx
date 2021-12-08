import React, { FC } from 'react'
import styled from 'styled-components'

import Button from './Button'
import { Text, View } from './Themed'

const ActionButton = styled(Button)`
    border: none;
    padding: 5px 10px;
    margin: 0 5px;
`

const ActionButtonText = styled(Text)`
    font-size: 20px;
`

const ButtonContainer = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: -10px;
`

type ActionButtonProps = {
    actions: { label: string; action: () => void; color?: string }[]
}

const ActionButtons: FC<ActionButtonProps> = (props) => (
    <ButtonContainer>
        {props.actions.map(({ label, action, color }) => (
            <ActionButton key={label} onPress={action}>
                <ActionButtonText darkColor={color} lightColor={color}>
                    {label}
                </ActionButtonText>
            </ActionButton>
        ))}
    </ButtonContainer>
)

export default ActionButtons
