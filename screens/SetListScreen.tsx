import React, { FC } from 'react'
import { FlatList, ListRenderItem, Pressable } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import styled from 'styled-components'

import { MaterialIcons, Text, View } from '../components/Themed'
import { getMSValue } from '../hooks/useTapTempoSubDivision'
import { usePlaylist, ISong } from '../contexts/playlist'
import { BottomTabParamList } from '../types'
import Button from '../components/Button'
import { useConfirmation } from '../contexts/confirm'

const Container = styled(View)`
    padding: 20px;
    flex: 1;
    align-items: center;
`

const Row = styled(View)`
    align-self: stretch;
    flex-direction: row;
    padding-bottom: 10px;
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

const EDIT_IMPLEMENTED = false

const SetListScreen: FC<StackScreenProps<BottomTabParamList, 'Set List'>> = ({ navigation }) => {
    const { playlist, removeSong } = usePlaylist('default')
    const { openConfirmation } = useConfirmation()

    const confirmRemove = (song: ISong, index: number) => {
        openConfirmation(`Are you sure you want to delete "${song.title}"?`, 'Yes', () => removeSong(index))
    }

    const renderRow: ListRenderItem<ISong> = ({ item, index }) => (
        <Row>
            <Col style={{ flexGrow: 2 }}>
                <CellText>{item.title}</CellText>
            </Col>
            <Col>
                <CellText>{getMSValue(item.bpm, item.subdivision)} ms</CellText>
            </Col>
            <Col style={{ justifyContent: 'flex-end', flexShrink: 1 }}>
                {EDIT_IMPLEMENTED && (
                    <Pressable>
                        <MaterialIcons size={26} name="edit" />
                    </Pressable>
                )}
                <Pressable onPress={() => confirmRemove(item, index)}>
                    <MaterialIcons size={30} name="close" darkColor="#F00" lightColor="#F00" />
                </Pressable>
            </Col>
        </Row>
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
            <FlatList
                style={{ width: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
                data={playlist}
                renderItem={renderRow}
                keyExtractor={(item, index) => item.title + index}
            />
        </Container>
    )
}

export default SetListScreen