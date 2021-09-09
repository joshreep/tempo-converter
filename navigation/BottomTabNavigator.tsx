import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ThemeContext } from 'styled-components'

import TempoConverterScreen from '../screens/TempoConverterScreen'
import SettingsScreen from '../screens/SettingsScreen'
import { BottomTabParamList, TempoConverterParamList, SettingsParamList } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
    const theme = React.useContext(ThemeContext)

    return (
        <BottomTab.Navigator initialRouteName="Tempo Converter" tabBarOptions={{ activeTintColor: theme.primary }}>
            <BottomTab.Screen
                name="Tempo Converter"
                component={TempoConverterNavigator}
                options={{
                    tabBarIcon: MetronomeIconWrapper,
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                    tabBarIcon: SettingsIconWrapper,
                }}
            />
        </BottomTab.Navigator>
    )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function MetronomeIconWrapper({ color }: { color: string; focused: boolean; size: number }) {
    return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} name="metronome" color={color} />
}

function SettingsIconWrapper({ color }: { color: string; focused: boolean; size: number }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} name="ios-cog-outline" color={color} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TempoConverterStack = createStackNavigator<TempoConverterParamList>()
function TempoConverterNavigator() {
    return (
        <TempoConverterStack.Navigator>
            <TempoConverterStack.Screen
                name="TempoConverterScreen"
                component={TempoConverterScreen}
                options={{ headerTitle: 'Tempo Converter' }}
            />
        </TempoConverterStack.Navigator>
    )
}

const SettingsStack = createStackNavigator<SettingsParamList>()
function SettingsNavigator() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ headerTitle: 'Settings' }}
            />
        </SettingsStack.Navigator>
    )
}
