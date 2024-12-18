export default [
    {
        root: true,
        env: { node: true },
        parser: '@typescript-eslint/parser',
        plugins: ['@typescript-eslint'],
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended',
            'plugin:jest/recommended',
            'plugin:jest/style',
        ],
        files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
        ignores: ['node_modules', 'coverage'],
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
            'react/prop-types': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
]
