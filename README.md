[![](https://img.shields.io/badge/owner-Multiple-blue)](#owners)

# Homeday Assets

A library of Homeday's icons and illustrations.
The project is automatically updated when a new version of our Figma library is published.

The available assets can be found under [the assets directory](https://github.com/homeday-de/homeday-assets/tree/master/assets)

### Owners

This project is owned by @ilyasmez, Homeday's frontend (with the support of the design team).

## Getting started

### Installation

The package can be installed from NPM:

```sh
npm i homeday-assets
```

### Usage

The package contains different kinds of assets, and they are grouped under subdirectories:

```js
import { mail } from 'homeday-assets/S';
import { yinYang } from 'homeday-assets/M';
import { yinYang as yinYangLarge } from 'homeday-assets/L';
```

The `S` collection (icons) is the default, so it can be used just as:

```js
import { mail } from 'homeday-assets';
```

## Development

### Setup locally

1. Fork the repo.

2. Clone the repo:

```sh
git clone https://github.com/YOUR-USERNAME/homeday-assets
```

3. Make sure that you're using a supported node version (v14.x.x), if you use NVM, run:

```sh
nvm install
nvm use
```

4. Install the dependencies:

```sh
npm i
```

### Add/Update/Remove assets from an existing group

The project is self-sustainable, which means that it updates itself when a new version of our Figma library is published. So if your change is about adding/updating/removing an asset, please contact the design team to make that change in the Figma library, it will be added to this repo automatically afterwards.
If you're not part of Homeday's organization, please create an issue.

### Add a new asset group

1. Make sure that they are already available on our Figma library.
2. Add an entry in the assets-importer's config file.
3. Run the import script:

```sh
npm run import-assets
```

### Learn more about the modules of the project:

All these modules are being used automatically by our CI, and you'll rarely have to invoke them manually.

#### Assets Importer

Imports the assets from the Figma libary... [Read more](https://github.com/homeday-de/homeday-assets/tree/master/src/assets-importer).

#### Repo Syncer

Detects if the changes made are patch (an asset has been modified), minor (new assets have been added) or major (an asset has been removed, renamed or moved), creates a descriptive commit and pushes it to the main branch of the repo.

The module can be invoked with:

```sh
npm run sync-repo
```

⚠️ The script above has side effects: It will commit and push to your repo.

#### Builder

Builds the package that will be published on NPM. Its role is to include just the necessary files in the package (assets, package.json and the index files) and also make them easy to consume (direct subdirectories).
The build can be found in the `dist` directory.

The module can be invoked with:

```sh
npm run build
```

## Testing

TBA

## Contributing

###### See [Development](#development) to learn how to make changes.

This project follows [forking workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow). In addition to [Gitmoji](https://gitmoji.carloscuesta.me/) as a commits naming convention.

1. Use a meaningful title when merging your PR.
2. Give the title a semantic meaning through [emojis](https://gitmoji.carloscuesta.me/). Please use emoji first, then the text.
3. **:boom: - marks breaking changes (MAJOR version change)**
4. **:sparkles: - marks new feature (MINOR version change)**
5. The other gitmojis are either a **patch** or have no effect at all.

It is important to follow this convention, because our automated releases depend on it.

## How does the automation it work?

<img src="https://github.com/homeday-de/homeday-assets/blob/master/diagram.jpg">
