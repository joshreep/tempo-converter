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
    justify-content: center;
    margin-bottom: -10px;
`

type YesNoButtonProps = {
    actions: Record<string, (() => void) | undefined>
}

const ActionButtons: FC<YesNoButtonProps> = (props) => (
    <ButtonContainer>
        {Object.entries(props.actions).map(([actionText, action]) => (
            <ActionButton key={actionText} onPress={action}>
                <ActionButtonText>{actionText}</ActionButtonText>
            </ActionButton>
        ))}
    </ButtonContainer>
)

export default ActionButtons
