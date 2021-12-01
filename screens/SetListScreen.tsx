import React, { FC } from 'react'
import { FlatList, ListRenderItem, Pressable, TouchableOpacity } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import styled from 'styled-components'

import { MaterialIcons, Text, View } from '../components/Themed'
import { getMSValue } from '../hooks/useTapTempoSubDivision'
import { usePlaylist, ISong } from '../contexts/playlist'
import { BottomTabParamList } from '../types'

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

const ListEmpty = styled(Text)``

const SetListScreen: FC<StackScreenProps<BottomTabParamList, 'Set List'>> = ({ navigation }) => {
    const { playlist, removeSong } = usePlaylist('default')

    const confirmRemove = (song: ISong, index: number) => {
        removeSong(index)
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
                <Pressable>
                    <MaterialIcons size={26} name="edit" />
                </Pressable>
                <Pressable onPress={() => confirmRemove(item, index)}>
                    <MaterialIcons size={30} name="close" darkColor="#F00" lightColor="#F00" />
                </Pressable>
            </Col>
        </Row>
    )

    const ListEmptyComponent = (
        <ListEmpty>
            There are currently no songs in the playlist.{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Tempo Converter')}>
                <Text>Add one?</Text>
            </TouchableOpacity>
        </ListEmpty>
    )

    return (
        <Container>
            <FlatList
                style={{ width: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
                data={playlist}
                renderItem={renderRow}
                keyExtractor={(item, index) => item.title + index}
                ListEmptyComponent={ListEmptyComponent}
            />
        </Container>
    )
}

export default SetListScreen
