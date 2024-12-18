export default {
    prefixes: ['/'],
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
