# Eslint Config Sprylab

This is an eslint config used at Sprylab GmbH for typescript, react and react-native based projects.

## Installation

```bash
yarn add --dev @sprylab/eslint-config
```

or

```bash
npm i --save-dev @sprylab/eslint-config
```

Also make sure to have `prettier` and of course `typescript` and `eslint` installed as well.
Then add the following config to your extend array in your eslint config file.

```js
module.exports = {
    extends: [
        '@sprylab/eslint-config', // this is the base
        /* 
            for react: '@sprylab/eslint-config/react'
            for native: '@sprylab/eslint-config/native'
        */
    ],
    parserOptions: {
        project: './tsconfig.json', // should be the path to the projects tsconfig.json
    },
}
```

**IMPORTANT**:

- For this config to work you need to have a tsconfig.json file at the repo root level, and then you have to set the parserOptions.project to point to your tsconfig file. [see the @typescript-eslint plugin docs](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
- You also need to have @babel/core installed [see the @babel eslint parser docs](https://www.npmjs.com/package/@babel/eslint-parser)
- for the best experience you should have a prettier config file at the repo root as well, otherwise the eslint-config-prettier will use its builtin defaults.
- if you use path aliases, (e.g. use "@" as a path alias to /src etc.), you will probably need to setup a path resolver for the eslint-plugin-import package or turn off some of its rules. There is a resolver for [node](https://www.npmjs.com/package/eslint-import-resolver-node), [typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript), [babel](https://www.npmjs.com/package/eslint-import-resolver-babel-module), [webpack](https://www.npmjs.com/package/eslint-import-resolver-webpack) etc.

## Configuration

This package includes three distinct configs:

### base

- @typescript, @babel, es2021, node globals and testing-library.

```js
extends: [
    '@sprylab/eslint-config',
],
```

### react

- base config, browser globals, react, react-hooks and testing-library/react.

```js
extends: [
    '@sprylab/eslint-config/react',
]
```

### native

- native -> react config + react native

```js
extends: [
    '@sprylab/eslint-config/native',
]
```

## Plugins included

This config includes and configures the following eslint plugins / parsers:

### Parsers

For javascript files (\*.js(x)):

- `@babel/eslint-parser`
- `@babel/eslint-plugin`

For typescript files only (\*.ts(x)):

- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`

### Plugins

#### Base

plugins shared by all configs / overrides

- `eslint-config-prettier`
- `eslint-plugin-prettier`
- `eslint-plugin-import`
- `eslint-plugin-sonarjs`
- `eslint-plugin-sort-imports-es6-autofix`

#### Testing

plugins shared across all configs for test files (example.spec.ts) etc.)

- `eslint-plugin-testing-library`
- `eslint-plugin-jest`

#### Non-Testing

- `eslint-plugin-unicorn`

#### React and React Native

- `eslint-plugin-react`
- `eslint-plugin-react-hooks`

#### React (exclusive)

- `plugin:jsx-a11y/recommended`

#### React Native (exclusive)

- `eslint-plugin-react-native`

## Recommendations

- add a pre-commit eslint check using [husky](https://www.npmjs.com/package/husky) and [lint-staged](https://github.com/okonet/lint-staged) to your `package.json` file, for example:

```json
"husky": {
    "hooks": {
        "pre-commit": "lint-staged"
    }
},
"lint-staged": {
    "*.{md,json,yml,yaml}": [
        "prettier --write"
    ],
    "*.{js,jsx,ts,tsx}": [
        "eslint --fix"
    ]
}
```

- add `package.json` eslint scripts:

```json
"scripts": {
    "check:script": "eslint --fix-dry-run './{src,__tests__}/**/*.{js,ts,tsx}'",
    "lint:script": "eslint --fix './{src,__tests__}/**/*.{js,ts,tsx}'",
}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Goldziher"><img src="https://avatars1.githubusercontent.com/u/30733348?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Na'aman Hirschfeld</b></sub></a><br /><a href="https://github.com/Sprylab GmbH/@sprylab/eslint-config/commits?author=Goldziher" title="Code">💻</a> <a href="https://github.com/Sprylab GmbH/@sprylab/eslint-config/commits?author=Goldziher" title="Documentation">📖</a> <a href="#design-Goldziher" title="Design">🎨</a> <a href="#tool-Goldziher" title="Tools">🔧</a> <a href="#maintenance-Goldziher" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome! See our [contribution guidelines](CONTRIBUTING.MD)!