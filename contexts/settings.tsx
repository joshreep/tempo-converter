import React, { createContext, FC, PropsWithChildren, useContext } from 'react'

import { DEFAULT_SETTINGS } from '../constants/subdivisions'
import useAsyncStorage from '../hooks/useAsyncStorage'

type Settings = { [key: string]: boolean }

const SettingsContext = createContext<{
    settings: Settings
    setSettings: (newValue: Partial<Settings>) => Promise<void>
}>({ settings: DEFAULT_SETTINGS, setSettings: () => Promise.resolve() })

export function useSettings() {
    return useContext(SettingsContext)
}

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [settings, setSettings] = useAsyncStorage<{ [key: string]: boolean }>('settings', DEFAULT_SETTINGS)

    return <SettingsContext.Provider value={{ settings, setSettings }}>{children}</SettingsContext.Provider>
}
