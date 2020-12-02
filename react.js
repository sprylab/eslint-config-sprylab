const base = require('./index')

const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
]
const reactRules = {
    'react-hooks/exhaustive-deps': 0,
    'react/display-name': 1,
}

const overrides = base.overrides.map((override) => ({
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
        ...reactRules,
    },
}))

module.exports = {
    env: { es2021: true, browser: true },
    overrides,
    settings: {
        react: {
            version: 'detect',
        },
    },
}
