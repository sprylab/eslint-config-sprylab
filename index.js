const plugins = ['sort-imports-es6-autofix']
const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'prettier',
]
const testingExtendsList = ['plugin:jest/recommended', 'plugin:jest/style']
const baseRules = {
    'no-console': 1,
    'curly': 2,
    'eqeqeq': 2,
    'sort-imports-es6-autofix/sort-imports-es6': 2,
    'prefer-const': [
        'error',
        {
            destructuring: 'all',
        },
    ],
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
}
const testBaseRules = {
    'no-console': 0,
    'sort-imports-es6-autofix/sort-imports-es6': 2,
    'jest/no-try-expect': 0,
    'jest/no-conditional-expect': 0,
    'sonarjs/no-duplicate-string': 0,
    'sonarjs/no-identical-functions': 0,
    'sonarjs/cognitive-complexity': 0,
}
const tsBaseRules = {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/prefer-optional-chain': 2,
    '@typescript-eslint/prefer-nullish-coalescing': 2,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreIIFE: true, ignoreVoid: true },
    ],
    '@typescript-eslint/naming-convention': [
        'error',
        {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
                regex: '^I[A-Z]',
                match: false,
            },
        },
    ],
    '@typescript-eslint/unbound-method': [
        'error',
        {
            ignoreStatic: true,
        },
    ],
    '@typescript-eslint/no-unused-vars': [
        'warn',
        { args: 'all', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/array-type': [
        'error',
        {
            default: 'array',
        },
    ],
    '@typescript-eslint/consistent-indexed-object-style': 2,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unnecessary-type-arguments': 2,
    '@typescript-eslint/no-unnecessary-condition': 2,
    '@typescript-eslint/no-extra-non-null-assertion': 2,
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,
    // recommended configs from the typescript eslint repo - turn off conflicting import rules
    'import/named': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
}
const tsTestRules = {
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-implied-eval': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/unbound-method': 0,
}
const jsBaseRules = {
    'new-cap': 0,
    'no-invalid-this': 0,
    'no-unused-expressions': 0,
    '@babel/new-cap': 2,
    '@babel/no-invalid-this': 2,
    '@babel/no-unused-expressions': 2,
}
const tsConfig = {
    files: ['**/*.ts', '**/*.tsx'],
    parser: '@typescript-eslint/parser',
    plugins,
    extends: extendsList,
    rules: { ...baseRules, ...tsBaseRules },
}
const jsConfig = {
    files: ['**/*.js', '**/*.jsx', '*.js', '*.jsx'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        requireConfigFile: false,
    },
    ecmaFeatures: {
        jsx: true,
    },
    plugins: [...plugins, '@babel'],
    extends: extendsList.filter(
        (pluginName) => !pluginName.includes('typescript'),
    ),
    rules: { ...baseRules, ...jsBaseRules },
}

const jestConfig = (extensions) => ({
    ...(extensions.includes('js') ? jsConfig : tsConfig),
    files: [
        `**/*.{spec,test}.{${extensions}}`,
        `**/{__tests__,__mocks__,tests,test}/*.{${extensions}}`,
        `**/jest.setup.{${extensions}}`,
    ],
    env: {
        'jest': true,
        'jest/globals': true,
    },
    rules: extensions.includes('js')
        ? { ...jsBaseRules, ...testBaseRules }
        : {
              ...tsBaseRules,
              ...testBaseRules,
              ...tsTestRules,
          },
    extends: extensions.includes('ts')
        ? [...extendsList, ...testingExtendsList]
        : [...extendsList, ...testingExtendsList].filter(
              (pluginName) => !pluginName.includes('typescript'),
          ),
})

module.exports = {
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    env: { node: true, es2021: true },
    overrides: [jsConfig, tsConfig, jestConfig('ts,tsx'), jestConfig('js,jsx')],
}
