import React, { FC, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import styled from 'styled-components'
import DraggableFlatList, { RenderItem, ScaleDecorator, ShadowDecorator } from 'react-native-draggable-flatlist'

import { MaterialIcons, Text, View } from '../components/Themed'
import { getMSValue } from '../hooks/useTapTempoSubDivision'
import { usePlaylist, ISong } from '../contexts/playlist'
import { BottomTabParamList } from '../types'
import Button from '../components/Button'
import AddEditSongModal, { WriteMode } from '../components/AddEditSongModal'

const Container = styled(View)`
    flex: 1;
    align-items: center;
`

const Row = styled(View)`
    align-self: stretch;
    flex-direction: row;
    padding: 10px 20px;
`

const PressableRow = styled(Pressable)`
    width: 100%;
`

const Col = styled(View)`
    flex: 1;
    align-self: stretch;
    align-items: center;
    flex-direction: row;
`

const GrowCol = styled(Col)`
    flex-grow: 2;
`

const CellText = styled(Text)`
    font-size: 16px;
`

const BoldCellText = styled(CellText)`
    font-weight: bold;
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

const ListEmptyButtonText = styled(Text)`
    font-size: 24px;
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

    const renderRow: RenderItem<ISong> = ({ item, index, drag }) => (
        <ScaleDecorator>
            <ShadowDecorator>
                <PressableRow onPress={() => index != null && launchEditModal(item, index)} onLongPress={drag}>
                    <Row>
                        <GrowCol>
                            <CellText>{item.title}</CellText>
                        </GrowCol>
                        <Col>
                            <CellText>{item.bpm} bpm</CellText>
                        </Col>
                        <Col>
                            <BoldCellText>{getMSValue(item.bpm, item.subdivision)} ms</BoldCellText>
                        </Col>
                    </Row>
                </PressableRow>
            </ShadowDecorator>
        </ScaleDecorator>
    )

    if (playlist.length === 0)
        return (
            <ListEmptyContainer>
                <ListEmptyText>There are currently no songs in the playlist.</ListEmptyText>
                <ListEmptyButton onPress={() => navigation.navigate('Tempo Converter')}>
                    <MaterialIcons name="add" size={24} />
                    <ListEmptyButtonText>Add one?</ListEmptyButtonText>
                </ListEmptyButton>
            </ListEmptyContainer>
        )

    return (
        <Container>
            <DraggableFlatList
                containerStyle={styles.ListContainer}
                data={playlist}
                keyExtractor={(item: ISong, index: number) => item.title + index}
                onDragEnd={({ data }) => reorderSongs(data)}
                renderItem={renderRow}
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

const styles = StyleSheet.create({
    ListContainer: {
        width: '100%',
        height: '100%',
        margin: 20,
    },
})
