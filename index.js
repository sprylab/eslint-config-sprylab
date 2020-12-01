const plugins = ['prettier', 'sonarjs', 'sort-imports-es6-autofix']
const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
]
const baseRules = {
    'no-console': 1,
    'sort-imports-es6-autofix/sort-imports-es6': 2,
    'import/named': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
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
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: true,
    },
    ecmaFeatures: {
        jsx: true,
    },
    plugins: [...plugins, '@babel'],
    extends: extendsList.filter(
        (pluginName) => !pluginName.includes('typescript'),
    ),
    rules: {
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
        'sonarjs/no-duplicate-string': 0,
        'sonarjs/no-identical-functions': 0,
    },
    extends: [
        ...extendsList,
        'plugin:testing-library/recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
    ],
})

const jsJestConfig = {...jsConfig, ...jestConfig('js,jsx')}
jsJestConfig.extends = jsJestConfig.extends.filter(
    (pluginName) => !pluginName.includes('typescript'),
)

module.exports = {
    env: { es2021: true },
    plugins,
    extends: extendsList,
    rules: { ...baseRules, ...tsBaseRules },
    overrides: [
        jsConfig,
        jsJestConfig,
        {
            ...jestConfig(),
            rules: {
                ...baseRules,
                ...tsBaseRules,
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
