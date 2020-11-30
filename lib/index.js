module.exports = {
	root: true,
	env: {
		es6: true,
	},
	plugins: [
		'prettier',
		'sonarjs',
		'jest',
		'sort-imports-es6-autofix',
	],
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
	parserOptions: {
		project: './tsconfig.json',
	},
	rules: {
		'sort-imports-es6-autofix/sort-imports-es6': 2,
		'react-hooks/exhaustive-deps': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/prefer-optional-chain': 2,
		'@typescript-eslint/prefer-nullish-coalescing': 2,
		'@typescript-eslint/no-floating-promises': [
			'error',
			{ ignoreIIFE: true, ignoreVoid: true },
		],
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
				'react-native/no-inline-styles': 0,
			},
		},
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
}
