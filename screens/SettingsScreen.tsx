import React, { useContext } from 'react'
import { ScrollView, Text, View } from 'react-native'
import styled, { ThemeContext } from 'styled-components'

import SwitchWithLabel from '../components/SwitchWithLabel'
import { SUBDIVISIONS } from '../constants/subdivisions'
import { useSettings } from '../contexts/settings'

const Container = styled(View)`
    padding: 5px 25px 25px;
`

const Header = styled(Text)`
    font-size: 20px;
    color: ${({ theme }) => theme.primaryText};
    margin: 20px 0px 10px;
`

export default function SettingsScreen() {
    const { settings, setSettings } = useSettings()
    const theme = useContext(ThemeContext)

    const updateSubdivisionSetting = (key: string, value: boolean) => {
        setSettings({ [key]: value })
    }

    return (
        <ScrollView>
            <Container>
                <Header>Show Subdivisions</Header>
                {Object.keys(SUBDIVISIONS).map((key) => (
                    <SwitchWithLabel
                        key={key}
                        label={key}
                        onValueChange={(value) => updateSubdivisionSetting(key, value)}
                        value={settings[key]}
                        trackColor={{ true: theme?.primary }}
                    />
                ))}
            </Container>
        </ScrollView>
    )
}
