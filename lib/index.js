const base = {
    env: { es2021: true, browser: true },
    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: [
                '*.{spec,test}.{ts,tsx}',
                '**/__{mocks,tests}__/**/*.{ts,tsx}',
            ],
            env: {
                'jest': true,
                'jest/globals': true,
            },
            rules: {
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
                'jest/no-try-expect': 0,
                'react/display-name': 0,
                'react/prop-types': 0,
                'sonarjs/no-duplicate-string': 0,
                'sonarjs/no-identical-functions': 0,
            },
        },
    ],
    plugins: ['prettier', 'sonarjs', 'jest', 'sort-imports-es6-autofix'],
    rules: {
        'no-console': 1,
        'sort-imports-es6-autofix/sort-imports-es6': 2,
        'react-hooks/exhaustive-deps': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/prefer-optional-chain': 2,
        '@typescript-eslint/prefer-nullish-coalescing': 2,
        '@typescript-eslint/no-floating-promises': [
            'error',
            { ignoreIIFE: true, ignoreVoid: true },
        ],
        "import/named": 0,
        "import/namespace": 0,
        "import/default": 0,
        "import/no-named-as-default-member": 0,
        "react/display-name": 1,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jest/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:testing-library/react',
        'plugin:sonarjs/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
}

module.exports = base