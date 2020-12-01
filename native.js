const react = require('./react')

const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:testing-library/react',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
]

const overrides = react.overrides.map((override) => ({
    ...override,
    extends: override.files[0].includes('*.js')
        ? override.files[0].includes('spec')
            ? [
                  ...extendsList.filter(
                      (extendEntry) => !extendEntry.includes('typescript'),
                  ),
                  'plugin:testing-library/react',
                  'plugin:jest/recommended',
                  'plugin:jest/style',
              ]
            : extendsList.filter(
                  (extendEntry) => !extendEntry.includes('typescript'),
              )
        : override.files[0].includes('spec')
        ? [
              ...extendsList,
              'plugin:testing-library/react',
              'plugin:jest/recommended',
              'plugin:jest/style',
          ]
        : extendsList,
}))

module.exports = {
    ...react,
    env: { 'es2021': true, 'react-native/react-native': true },
    rules: {
        ...react.rules,
        'react-native/no-color-literals': 0,
        'react-native/no-raw-text': 0,
    },
    extends: extendsList,
    overrides,
    settings: {
        react: {
            version: 'detect',
        },
    },
}
