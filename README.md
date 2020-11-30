# Eslint Config Sprylab

This is an eslint config used at Sprylab GmbH for typescript based react and react-native based projects.

## Installation

```bash
yarn add --dev eslint-config-sprylab
```

Also make sure to have `prettier` and of course `typescript`  and `eslint` installed as well. 
Then add the following the config to your extend array in your eslint config file. 

```js
extends: [
    'eslint-config-sprylab', // this is the default browser / react config in the package, read below
],
parserOptions: {
    project: './tsconfig.json', // should be the path to the projects tsconfig.json
}
```
**NOTE**: you must set the parserOptions.project to point to your tsconfig file.

## Configs

This package includes two distinct configs:

- react -> base + browser + react + react hooks
- native -> base + react + react hooks + react native

By default the react config is exported. 

To use the native config simply do:
```js
extends: [
    'eslint-config-sprylab/native',
]
```