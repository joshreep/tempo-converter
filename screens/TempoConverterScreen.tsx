import React from 'react'
import styled from 'styled-components'
import { KeyboardAvoidingView as _KeyboardAvoidingView, Platform, TextInput } from 'react-native'

import { Text, View } from '../components/Themed'
import DismissKeyboard from '../components/DismissKeyboard'
import TapTempoButton from '../components/TapTempoButton'
import SubdivisionGrid from '../components/SubdivisionGrid'
import useTapTempoSubDivision from '../hooks/useTapTempoSubDivision'

const KeyboardAvoidingView = styled(_KeyboardAvoidingView)`
    flex: 1;
`

const Container = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const InputWrapper = styled(View)`
    flex-flow: row nowrap;
    justify-content: center;
    align-items: baseline;
    margin: 20px;
`

const Input = styled(TextInput)`
    font-size: 35px;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.textColor};
    color: ${({ theme }) => theme.textColor};
`

const InputSuffix = styled(Text)`
    font-size: 35px;
`

export default function TempoConverterScreen() {
    const { handleTap, bpm, setBpm, subdivisions } = useTapTempoSubDivision()

    const handleBpmChange = (text: string) => {
        setBpm(+text)
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <DismissKeyboard>
                <Container>
                    <InputWrapper>
                        <Input
                            value={!isNaN(bpm) && isFinite(bpm) ? bpm.toString() : '  '}
                            onChangeText={handleBpmChange}
                            keyboardType="number-pad"
                            clearTextOnFocus
                            maxLength={3}
                        />
                        <InputSuffix> bpm</InputSuffix>
                    </InputWrapper>
                    <TapTempoButton onPressIn={handleTap} />
                    <SubdivisionGrid subdivisions={subdivisions} />
                </Container>
            </DismissKeyboard>
        </KeyboardAvoidingView>
    )
}
