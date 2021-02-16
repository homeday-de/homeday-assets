# Assets Importer

### Prerequisites

Make sure that you have a `.env.local` file in the root directory of the project with the variable `FIGMA_ACCESS_TOKEN`

E.g:

```
# .env.local
FIGMA_ACCESS_TOKEN=xxxxx-xxxxxxxx-xxxx-xxx-xxxx-xxxxxxxxxxx
```

⚠ **Do not commit this file.**

### Terminology

A collection is a set of assets that share the same configuration.

### Configuration

In the CONFIG.js file you can add/remove/edit your collections inside `COLLECTIONS` _(Array)_.

Each collection should contain the following properties:

`name` _(String)_ A unique name of your choice for the collection.
`figmaFileKey` _(String)_ The key of the Figma file
`matchingRegex` _(RegExp)_ The regular expression that the component's name should match to be imported.
`filenameRegex` _(RegExp)_ A regular expression to generate the new file name based on the original component name.
`format` _(String)_ The format you want for the image (The currently supported formats: jpg, png, svg, and pdf).

### How to use

**To import all the collections:**

```
npm run import-assets
```

**To import one specific collection:**

```
npm run import-assets -- collectionName
```

`collectionName` should match the `name` property of your collections.

### Todos:

- Use functions instead of RegExp.
