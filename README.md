# Greek Glosses

The purpose of this repo is to create a dictionary of glossses based on `GreekWordList.js` in <https://github.com/openscriptures/GreekResources>. `GreekWordList.js` needs to be modified. It sets a global variable `greekWordList = { ... }`. This should use the `export default` syntax.

`main.js` expects the `export default` syntax in `GreekWordList.esm.js` (note `.esm`). The `prepare.sh` script assists in this conversion.

## Setup

1. Clone <https://github.com/openscriptures/GreekResources> into `./source-files/`
2. Run `sh prepare.sh` to convert `GreekWordList.js`

## Execution

The script is js written for the deno runtime.

```
deno run --allow-read --allow-write main.js
```

This will build the `glosses.sqlite` file in `./build/`