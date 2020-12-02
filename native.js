const react = require('./react')

const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
]

const reactNativeRules = {
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 0,
}

const overrides = react.overrides.map((override) => ({
    ...override,
    extends: override.files[0].includes('*.js')
        ? override.files[0].includes('test')
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
        : override.files[0].includes('test')
        ? [
              ...extendsList,
              'plugin:testing-library/react',
              'plugin:jest/recommended',
              'plugin:jest/style',
          ]
        : extendsList,
    rules: {
        ...override.rules,
        ...reactNativeRules,
    },
}))

module.exports = {
    ...react,
    env: { 'es2021': true, 'react-native/react-native': true, 'node': true },
    overrides,
}
