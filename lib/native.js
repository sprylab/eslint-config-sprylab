const base = require("./index")

module.exports = {
    ...base,
    env: {es6: true, 'react-native/react-native': true,},
    rules: {...base.rules, "react-native/no-color-literals": 0},
    extends: [
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
}
