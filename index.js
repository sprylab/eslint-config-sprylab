const merge = require('lodash.merge')

const plugins = ['prettier', 'sonarjs', 'sort-imports-es6-autofix']
const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:testing-library/react',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
]
const baseRules = {
    'no-console': 1,
    'sort-imports-es6-autofix/sort-imports-es6': 2,
    'react-hooks/exhaustive-deps': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
    'react/display-name': 1,
}

const tsBaseRules = {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/prefer-optional-chain': 2,
    '@typescript-eslint/prefer-nullish-coalescing': 2,
    '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreIIFE: true, ignoreVoid: true },
    ],
}
const jsConfig = {
    files: ['**/*.js', '**/*.jsx'],
    parser: '@babel/eslint-parser',
    plugins: [...plugins, '@babel'],
    extends: extendsList.filter(
        (pluginName) => !pluginName.includes('typescript'),
    ),
    rules: {
        ...baseRules,
        // overrides as suggested in the @babel/eslint-plugin: https://www.npmjs.com/package/@babel/eslint-plugin
        'new-cap': 0,
        'no-invalid-this': 0,
        'no-unused-expressions': 0,
        'object-curly-spacing': 0,
        'semi': 0,
        '@babel/new-cap': 2,
        '@babel/no-invalid-this': 2,
        '@babel/no-unused-expressions': 2,
        '@babel/object-curly-spacing': 2,
        '@babel/semi': 2,
    },
}

const jestConfig = (extensions = 'ts,tsx') => ({
    files: [`**/*.{spec,test}.${extensions}`],
    env: {
        'jest': true,
        'jest/globals': true,
    },
    rules: {
        'jest/no-try-expect': 0,
        'react/display-name': 0,
        'react/prop-types': 0,
        'sonarjs/no-duplicate-string': 0,
        'sonarjs/no-identical-functions': 0,
    },
    extends: [...extendsList, 'plugin:jest/recommended', 'plugin:jest/style'],
})

const tsJestConfig = jestConfig()
const jsJestConfig = merge(jsConfig, jestConfig('js,jsx'))
jsJestConfig.extends = jsJestConfig.extends.filter(
    (pluginName) => !pluginName.includes('typescript'),
)

module.exports = {
    env: { es2021: true },
    plugins,
    extends: extendsList,
    rules: merge(baseRules, tsBaseRules),
    overrides: [
        tsJestConfig,
        jsJestConfig,
        {
            ...tsJestConfig,
            plugins,
            rules: {
                ...jsJestConfig.rules,
                '@typescript-eslint/ban-ts-comment': 0,
                '@typescript-eslint/no-floating-promises': 0,
                '@typescript-eslint/no-implied-eval': 0,
                '@typescript-eslint/no-misused-promises': 0,
                '@typescript-eslint/no-unsafe-assignment': 0,
                '@typescript-eslint/no-unsafe-call': 0,
                '@typescript-eslint/no-unsafe-member-access': 0,
                '@typescript-eslint/no-unsafe-return': 0,
                '@typescript-eslint/no-var-requires': 0,
                '@typescript-eslint/unbound-method': 0,
            },
        },
    ],
}