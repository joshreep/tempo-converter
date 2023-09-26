export type RootStackParamList = {
    Root: undefined
    NotFound: undefined
}

export type BottomTabParamList = {
    'Tempo Converter': undefined
    'Set List': undefined
    Settings: undefined
}

export type TempoConverterParamList = {
    TempoConverterScreen: undefined
}

export type SetListParamList = {
    SetListScreen: undefined
}

export type SettingsParamList = {
    SettingsScreen: undefined
}

export type FastOmit<T extends object, U extends string | number | symbol> = {
    [K in keyof T as K extends U ? never : K]: T[K]
}
