import React, { useState } from 'react'
import styled from 'styled-components'
import { KeyboardAvoidingView as _KeyboardAvoidingView, Platform, TextInput } from 'react-native'

import { Text, View, MaterialIcons } from '../components/Themed'
import DismissKeyboard from '../components/DismissKeyboard'
import TapTempoButton from '../components/TapTempoButton'
import SubdivisionGrid from '../components/SubdivisionGrid'
import useTapTempoSubDivision from '../hooks/useTapTempoSubDivision'
import Button from '../components/Button'
import AddEditSongModal from '../components/AddEditSongModal'

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
    margin: 20px 20px 0;
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

const AddToSetListButton = styled(Button)`
    margin: 20px;
    flex-direction: row;
    border-radius: 1000px;
    /* padding: 5px; */
    font-size: 24px;
    border: none;
    color: ${({ theme }) => theme.primary};
    /* background-color: ${({ theme }) => theme.primary}; */
`

export default function TempoConverterScreen() {
    const { handleTap, bpm, setBpm, subdivisions } = useTapTempoSubDivision()
    const [addSongModalVisible, setAddSongModalVisible] = useState(false)

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
                    <AddToSetListButton onPress={() => setAddSongModalVisible(true)}>
                        <MaterialIcons name="add" size={24} />
                        <Text style={{ fontSize: 24 }}>Add to playlist</Text>
                    </AddToSetListButton>
                    <TapTempoButton onPressIn={handleTap} />
                    <SubdivisionGrid subdivisions={subdivisions} />
                    <AddEditSongModal
                        bpm={bpm}
                        closeModal={() => setAddSongModalVisible(false)}
                        visible={addSongModalVisible}
                    />
                </Container>
            </DismissKeyboard>
        </KeyboardAvoidingView>
    )
}
