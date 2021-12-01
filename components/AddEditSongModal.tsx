import { Picker } from '@react-native-community/picker'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { SubdivisionName } from '../constants/subdivisions'
import { usePlaylist } from '../contexts/playlist'
import useEnabledSubdivisions from '../hooks/useEnabledSubdivisions'
import ModalWrapper from './ModalWrapper'
import { TextInput } from './Themed'
import ActionButtons from './ActionButtons'

const SongInput = styled(TextInput)`
    font-size: 24px;
    margin-bottom: 12px;
    min-width: 200px;
    text-align: center;
`

type AddSongModalProps = {
    bpm: number
    closeModal: () => void
    visible: boolean
}

const AddEditSongModal: FC<AddSongModalProps> = (props) => {
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
            <ActionButtons actions={{ Add: handleAdd, Cancel: handleCancel }} />
        </ModalWrapper>
    )
}

export default AddEditSongModal
