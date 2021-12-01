import { Picker } from '@react-native-community/picker'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { SubdivisionName } from '../constants/subdivisions'
import { usePlaylist } from '../contexts/playlist'
import useEnabledSubdivisions from '../hooks/useEnabledSubdivisions'
import Button from './Button'
import ModalWrapper from './ModalWrapper'
import { Text, TextInput, View } from './Themed'

const SongInput = styled(TextInput)`
    font-size: 24px;
    margin-bottom: 12px;
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
    const { closeModal, visible } = props

    const [songTitle, setSongTitle] = useState('')
    const [subdivision, setSubdivision] = useState<SubdivisionName>('Quarter')
    const [bpm, setBpm] = useState(props.bpm.toString())

    const { addSong } = usePlaylist('default')
    const enabledSubdivisions = useEnabledSubdivisions()

    const resetValuesAndCloseModal = () => {
        setSongTitle('')
        setSubdivision('Quarter')
        closeModal()
    }

    const handleCancel = () => {
        resetValuesAndCloseModal()
    }

    const handleAdd = () => {
        addSong({ bpm: +bpm, title: songTitle, subdivision })
        resetValuesAndCloseModal()
    }

    useEffect(() => {
        setBpm(props.bpm.toString())
    }, [props.bpm])

    return (
        <ModalWrapper animationType="slide" transparent visible={visible}>
            <SongInput
                onChangeText={setSongTitle}
                value={songTitle}
                placeholder="Enter Song Title"
                autoCapitalize="words"
            />
            <SongInput
                onChangeText={setBpm}
                value={bpm}
                placeholder="Enter BPM"
                keyboardType="number-pad"
                maxLength={3}
            />
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
