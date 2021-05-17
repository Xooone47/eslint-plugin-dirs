# eslint-plugin-dirs

Eslint Rules for ensuring directory names and file names to be coincident.

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
        "dirs/dirnames": 2
    }
}
```

## Rules

### dirs/dirnames

Detect if every directory fragment in the file path is matched with the provided pattern.

```json
{
    "dirs/dirnames": [2, { pattern: "^[a-zA-Z0-9_-]+$" }],
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
