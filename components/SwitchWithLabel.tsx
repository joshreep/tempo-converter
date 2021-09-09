import React, { FC } from 'react'
import { Switch, SwitchProps, Text, View } from 'react-native'
import styled from 'styled-components'

const SwitchContainer = styled(View)`
    flex-flow: row nowrap;
    align-items: center;
    margin: 5px;
`

const Label = styled(Text)`
    padding-left: 10px;
`

type Props = SwitchProps & {
    label: string
}

const SwitchWithLabel: FC<Props> = (props) => {
    const { label, ...switchProps } = props
    return (
        <SwitchContainer>
            <Switch {...switchProps} />
            <Label>{label}</Label>
        </SwitchContainer>
    )
}

export default SwitchWithLabel
