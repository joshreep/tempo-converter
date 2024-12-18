// import * as Linking from 'expo-linking'

export default {
    // prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    TempoConverter: {
                        screens: {
                            TempoConverterScreen: 'tempoConverter',
                        },
                    },
                    SetList: {
                        screens: {
                            SetListScreen: 'setList',
                        },
                    },
                    Settings: {
                        screens: {
                            SettingsScreen: 'settings',
                        },
                    },
                },
            },
            NotFound: '*',
        },
    },
}
