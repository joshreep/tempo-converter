import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'
import { PlaylistProvider } from './contexts/playlist'
import { SettingsProvider } from './contexts/settings'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import getThemeValues from './theme/getThemeValues'

export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <ThemeProvider theme={getThemeValues(colorScheme)}>
                <SettingsProvider>
                    <PlaylistProvider>
                        <SafeAreaProvider>
                            <Navigation colorScheme={colorScheme} />
                            <StatusBar />
                        </SafeAreaProvider>
                    </PlaylistProvider>
                </SettingsProvider>
            </ThemeProvider>
        )
    }
}
