# eslint-plugin-dirs

An ESLint plugin that allows users to define naming conventions for directories and files.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
npm i eslint --save-dev
# or
yarn add -D eslint
```

Next, install `eslint-plugin-dirs`:

```bash
npm install eslint-plugin-dirs --save-dev
#or
yarn add -D eslint-plugin-dirs
```

## Usage

Add `dirs` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "dirs"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "dirs/dirnames": 2,
        "dirs/filenames": 2,
    }
}
```

## Rules

### dirs/dirnames

Detect if every directory fragment in the file path is matched with the provided pattern.

```json
{
    "dirs/dirnames": [2, { "pattern": "^[a-zA-Z0-9_-]+$" }],
}
```

For example, we provided pattern "^[a-zA-Z]+$", and got a file path "src/components/Com1/index.jsx". This rule will pass only when `src、components、Com1` are all matched with the pattern. In the current case, `Com1` is not matched, so this rule will be failed.

Options:

```ts
interface Options {
  pattern: string;
}

const defaultOptions: Options = {
    pattern: '^[a-zA-Z0-9_-]+$',
}
```

### dirs/filenames

Detect if file names are matched with the provided pattern.

```json
{
    "dirs/filenames": [
        2,
        {
            "src/utils/**/*": "^[a-zA-Z0-9_-]+$",
            "src/components/**/*": ["^[a-zA-Z0-9_-]+$", true],
        }
    ],
}
```

Options:

This rule has an object option for exceptions:

- `"key"`: the glob pattern of the deteced file path
- `"value"`: the value can be a string or an array. If it's a string, it should be the regular expression that the file name should be matched. If it's an array, the first element should be the regular expression, and the second element is a bool value means if disallow naming file as `'index'`.

```ts
type Pattern = string;
type DisallowIndex = boolean;
type PatternOption = Pattern | [Pattern, DisallowIndex];

interface Options {
  [globPattern: string]: PatternOption;
}

const defaultOptions: Options = {
    'src/**/*': ['^[a-zA-Z0-9_-]+$', false],
}
```
