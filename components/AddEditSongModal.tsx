import React, { FC, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components'

import { SubdivisionName } from '../constants/subdivisions'
import { usePlaylist } from '../contexts/playlist'
import useEnabledSubdivisions from '../hooks/useEnabledSubdivisions'
import ModalWrapper from './ModalWrapper'
import { Picker, TextInput, useThemeColor, View } from './Themed'
import ActionButtons from './ActionButtons'

const SongInput = styled(TextInput)`
    font-size: 24px;
    margin-bottom: 12px;
    min-width: 200px;
    text-align: center;
`

const Container = styled(View)`
    width: 100%;
    justify-content: center;
    align-content: stretch;
`

export enum WriteMode {
    Add = 'add',
    Edit = 'edit',
}

type AddSongModalProps = {
    bpm?: number
    closeModal: () => void
    index?: number
    mode: WriteMode
    songTitle?: string
    subdivision?: SubdivisionName
    visible: boolean
}

const AddEditSongModal: FC<AddSongModalProps> = (props) => {
    const { closeModal, visible } = props

    const [songTitle, setSongTitle] = useState(props.songTitle ?? '')
    const [subdivision, setSubdivision] = useState<SubdivisionName>(props.subdivision ?? 'Quarter')
    const [bpm, setBpm] = useState(props.bpm?.toString() ?? '')

    const { addSong, editSong, removeSong } = usePlaylist('default')
    const enabledSubdivisions = useEnabledSubdivisions()

    const textColor = useThemeColor({}, 'text')

    const resetValuesAndCloseModal = () => {
        setSongTitle(props.songTitle ?? '')
        setSubdivision(props.subdivision ?? 'Quarter')
        setBpm(props.bpm?.toString() ?? '')
        closeModal()
    }

    const handleCancel = () => {
        resetValuesAndCloseModal()
    }

    const handleAdd = () => {
        if (props.mode === WriteMode.Add) {
            addSong({ bpm: +bpm, title: songTitle, subdivision })
            resetValuesAndCloseModal()
        }
    }

    const handleEdit = () => {
        if (props.mode === WriteMode.Edit && props.index) {
            editSong(props.index, { bpm: +bpm, title: songTitle, subdivision })
            resetValuesAndCloseModal()
        }
    }

    const handleDelete = () => {
        if (props.mode === WriteMode.Edit && props.index) {
            Alert.alert(`Are you sure you want to delete "${songTitle}"?"`, 'This cannot be undone.', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        if (props.index) removeSong(props.index)
                        resetValuesAndCloseModal()
                    },
                },
            ])
        }
    }

    const actionButtonActions = {
        [WriteMode.Add]: [
            { label: 'Cancel', action: handleCancel },
            { label: 'Add', action: handleAdd },
        ],
        [WriteMode.Edit]: [
            { label: 'Cancel', action: handleCancel },
            { label: 'Delete', action: handleDelete, color: '#F00' },
            { label: 'Save', action: handleEdit },
        ],
    }

    useEffect(() => {
        setBpm(props.bpm?.toString() ?? '')
        setSongTitle(props.songTitle ?? '')
        setSubdivision(props.subdivision ?? 'Quarter')
    }, [props.bpm, props.songTitle, props.subdivision])

    return (
        <ModalWrapper animationType="fade" transparent visible={visible}>
            <Container>
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
                        <Picker.Item label={sub} value={sub} color={textColor} key={sub + index} />
                    ))}
                </Picker>
                <ActionButtons actions={actionButtonActions[props.mode]} />
            </Container>
        </ModalWrapper>
    )
}

export default AddEditSongModal
