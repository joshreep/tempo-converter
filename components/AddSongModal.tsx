import { Picker } from '@react-native-community/picker'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { SubdivisionName } from '../constants/subdivisions'
import { usePlaylist } from '../contexts/playlist'
import useEnabledSubdivisions from '../hooks/useEnabledSubdivisions'
import Button from './Button'
import ModalWrapper from './ModalWrapper'
import { Text, TextInput, View } from './Themed'

const SongNameInput = styled(TextInput)`
    font-size: 24px;
    /* margin-bottom: 12px; */
    min-width: 200px;
    text-align: center;
`

const ModalButton = styled(Button)`
    border: none;
    padding: 5px 10px;
    margin: 0 5px;
`

const ModalButtonText = styled(Text)`
    font-size: 20px;
`

const ModalButtonContainer = styled(View)`
    flex-direction: row;
    justify-content: center;
    margin-bottom: -10px;
`

type AddSongModalProps = {
    bpm: number
    closeModal: () => void
    visible: boolean
}

const AddSongModal: FC<AddSongModalProps> = (props) => {
    const { bpm, closeModal, visible } = props
    const { addSong } = usePlaylist('default')
    const [songTitle, setSongTitle] = useState('')
    const enabledSubdivisions = useEnabledSubdivisions()
    const [subdivision, setSubdivision] = useState<SubdivisionName>('Quarter')

    const resetValuesAndCloseModal = () => {
        setSongTitle('')
        setSubdivision('Quarter')
        closeModal()
    }

    const handleCancel = () => {
        resetValuesAndCloseModal()
    }

    const handleAdd = () => {
        addSong({ bpm, title: songTitle, subdivision })
        resetValuesAndCloseModal()
    }

    return (
        <ModalWrapper animationType="slide" transparent visible={visible}>
            <SongNameInput onChangeText={setSongTitle} value={songTitle} placeholder="Enter Song Title" />
            <Picker
                selectedValue={subdivision}
                onValueChange={(itemValue) => setSubdivision(itemValue as SubdivisionName)}
            >
                {Object.keys(enabledSubdivisions).map((sub, index) => (
                    <Picker.Item label={sub} value={sub} key={sub + index} />
                ))}
            </Picker>
            <ModalButtonContainer>
                <ModalButton onPress={handleAdd}>
                    <ModalButtonText>Add</ModalButtonText>
                </ModalButton>
                <ModalButton onPress={handleCancel}>
                    <ModalButtonText>Cancel</ModalButtonText>
                </ModalButton>
            </ModalButtonContainer>
        </ModalWrapper>
    )
}

export default AddSongModal
