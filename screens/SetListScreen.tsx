import React, { FC, useState } from 'react'
import { Pressable } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import styled from 'styled-components'
import DraggableFlatList, { RenderItem, ScaleDecorator } from 'react-native-draggable-flatlist'

import { MaterialIcons, Text, View } from '../components/Themed'
import { getMSValue } from '../hooks/useTapTempoSubDivision'
import { usePlaylist, ISong } from '../contexts/playlist'
import { BottomTabParamList } from '../types'
import Button from '../components/Button'
import AddEditSongModal, { WriteMode } from '../components/AddEditSongModal'

const Container = styled(View)`
    padding: 20px;
    flex: 1;
    align-items: center;
`

const Row = styled(Pressable)`
    align-self: stretch;
    flex-direction: row;
    padding-bottom: 20px;
`

const Col = styled(View)`
    flex: 1;
    align-self: stretch;
    align-items: center;
    flex-direction: row;
`

const CellText = styled(Text)`
    font-size: 16px;
`

const ListEmptyContainer = styled(View)`
    padding: 20px;
    flex: 1;
    align-items: center;
    justify-content: center;
`

const ListEmptyText = styled(Text)`
    font-size: 24px;
    text-align: center;
    padding-bottom: 10px;
`

const ListEmptyButton = styled(Button)`
    padding: 10px 20px;
    border-radius: 100px;
    flex-direction: row;
    border: none;
`

const SetListScreen: FC<StackScreenProps<BottomTabParamList, 'Set List'>> = ({ navigation }) => {
    const { playlist, reorderSongs } = usePlaylist('default')

    const [showEditModal, setShowEditModal] = useState(false)
    const [activeSong, setActiveSong] = useState<ISong>()
    const [activeIndex, setActiveIndex] = useState<number>()

    const launchEditModal = (song: ISong, index: number) => {
        setActiveSong(song)
        setActiveIndex(index)
        setShowEditModal(true)
    }

    const renderRow: RenderItem<ISong> = ({ item, index, drag, isActive }) => (
        <ScaleDecorator>
            <Row onPress={() => index != null && launchEditModal(item, index)} onLongPress={drag}>
                <Col style={{ flexGrow: 2 }}>
                    <CellText>{item.title}</CellText>
                </Col>
                <Col>
                    <CellText>{item.bpm} bpm</CellText>
                </Col>
                <Col>
                    <CellText style={{ fontWeight: 'bold' }}>{getMSValue(item.bpm, item.subdivision)} ms</CellText>
                </Col>
            </Row>
        </ScaleDecorator>
    )

    if (playlist.length === 0)
        return (
            <ListEmptyContainer>
                <ListEmptyText>There are currently no songs in the playlist.</ListEmptyText>
                <ListEmptyButton onPress={() => navigation.navigate('Tempo Converter')}>
                    <MaterialIcons name="add" size={24} />
                    <Text style={{ fontSize: 24 }}>Add one?</Text>
                </ListEmptyButton>
            </ListEmptyContainer>
        )

    return (
        <Container>
            <DraggableFlatList
                containerStyle={{ width: '100%' }}
                data={playlist}
                keyExtractor={(item: ISong, index: number) => item.title + index}
                onDragEnd={({ data }) => reorderSongs(data)}
                renderItem={renderRow}
                style={{ width: '100%' }}
            />
            <AddEditSongModal
                bpm={activeSong?.bpm}
                closeModal={() => setShowEditModal(false)}
                index={activeIndex}
                mode={WriteMode.Edit}
                songTitle={activeSong?.title}
                subdivision={activeSong?.subdivision}
                visible={showEditModal}
            />
        </Container>
    )
}

export default SetListScreen
