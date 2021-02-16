/* eslint-disable */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs').promises;
const fetch = require('node-fetch');
const camelCase = require('camelcase');
const PROJECT_CONFIG = require('../CONFIG');
const CONFIG = require('./CONFIG');

(async () => {
  if (require.main == module) {
    const firstArgument = process.argv[2];

    if (firstArgument === undefined) {
      await importAllCollections();
    } else {
      await importCollectionByName(firstArgument);
    }
  }
})();

/**
 * @param  {string} endpoint - the figma endpoint
 */
function fetchFromFigma(endpoint) {
  return fetch(`https://api.figma.com/v1${endpoint}`, {
    headers: {
      'x-FIGMA-token': process.env.FIGMA_ACCESS_TOKEN,
    },
  }).then((res) => res.json());
}

/**
 * @param  {Object} $0 - the params object
 * @param  {string} $0.name - the file name
 * @param  {RegExp} $0.regex - the regex used to normalize the file
 */
function normalizeFilename({ name, regex }) {
  const matches = name.match(regex);

  return matches ? matches.pop() : null;
}

/**
 * @param  {Object} $0 - the params object
 * @param  {string} $0.url - the url where the icon can be downloaded
 * @param  {string} $0.filename - the file name
 * @param  {string} $0.dest - the folder where the file will be downloaded
 */
async function download({ url, filename, dest = '' }) {
  const destPath = `${process.cwd()}${dest}`;

  const response = await fetch(url);

  await fs.mkdir(destPath, { recursive: true });

  await fs.writeFile(`${destPath}/${filename}`, await response.text());

  return filename;
}

/**
 * @param  {Object} $0 - the params object
 * @param  {string} $0.fileKey - the key to fetch the icons on Figma
 * @param  {string} $0.format - the file format
 * @param  {string} $0.dest - the path where the file will live
 * @param  {RegExp} $0.filenameRegex - the regex used to rename the file
 * @param  {RegExp} $0.matchingRegex - the regex used to group the files from Figma
 */
async function importAssetsFromFigma({
  fileKey,
  format,
  dest,
  filenameRegex,
  matchingRegex,
}) {
  if (process.env.FIGMA_ACCESS_TOKEN === undefined) {
    console.error(
      'FIGMA_ACCESS_TOKEN is undefined. Did you add it to your environment variables?'
    );
    process.exit(1);
  }

  const file = await fetchFromFigma(`/files/${fileKey}/components`);

  if (!file.meta.components || file.meta.components.length === 0) {
    console.warn('No components found for file', fileKey);
    return;
  }

  const filenameMap = file.meta.components.reduce((map, component) => {
    const isMatch = Array.isArray(component.name.match(matchingRegex));
    if (isMatch) {
      const filename = normalizeFilename({
        name: component.name,
        regex: filenameRegex,
      });
      map[component.node_id] = filename;
    }

    return map;
  }, {});

  const ids = Object.keys(filenameMap).join(',');
  const assets = await fetchFromFigma(
    `/images/${fileKey}?ids=${ids}&format=${format}`
  );

  if (assets.images === undefined) {
    console.warn('No images found for regexp', matchingRegex);
    return;
  }

  const downloadedFiles = await Promise.all(
    Object.entries(assets.images).map(
      ([id, url]) =>
        url &&
        download({
          url,
          filename: `${filenameMap[id]}.${format}`,
          dest,
        })
    )
  );

  createIndexFile({
    files: downloadedFiles,
    dest,
  });
}

/**
 * @param  {Object} $0 - the params object
 * @param  {object[]} $0.files - the list of files imported from Figma
 * @param  {string} $0.dest - the path where the icon will live
 */
function createIndexFile({ files, dest }) {
  const fileContent = [...new Set(files)]
    // To have a consistent order and avoid unnecessary line changes, we sort the array
    .sort((a, b) => b.localeCompare(a)) // Ascending
    .reduce((content, file) => {
      const fileName = file.split('.')[0];
      const exportName = camelCase(fileName);

      return `export { default as ${exportName} } from './${file}';\n${content}`;
    }, '');

  fs.writeFile(`${process.cwd()}${dest}/index.js`, fileContent);
}

/**
 * @param  {Object<string, object>} collection - the object representing the collection of icons - can be found on assets-importer/CONFIG.js
 */
async function importCollection(collection) {
  console.log(`📦 Importing collection "${collection.name}"...`);
  await importAssetsFromFigma({
    ...collection,
    dest: `/${PROJECT_CONFIG.ASSETS_DIR}/${collection.dir}`,
    fileKey: collection.figmaFileKey,
  });

  if (collection.isDefault) {
    updateMainIndexFile(collection);
  }

  console.log(
    `✅ Collection "${collection.name}" has been imported successfully!`
  );
}

async function importAllCollections() {
  console.log('Importing all the collections...');
  await Promise.all(
    CONFIG.COLLECTIONS.map((collection) => importCollection(collection))
  );
}

/**
 * @param  {string} collectionName - the name of the collection to be imported
 */
async function importCollectionByName(collectionName) {
  const collection = CONFIG.COLLECTIONS.find(
    ({ name }) => name === collectionName
  );

  if (collection === undefined) {
    console.error(
      `Couldn't find collection "${collectionName}", make sure it's in CONFIG.js`
    );
    return;
  }

  await importCollection(collection);
}

async function updateMainIndexFile({ dir }) {
  const destAbsolutePath = `${process.cwd()}/${PROJECT_CONFIG.ASSETS_DIR}`;
  const originalIndexPath = `${destAbsolutePath}/${dir}/index.js`;
  const originalContent = await fs.readFile(originalIndexPath, 'utf8');
  const newContent = originalContent.replace(
    new RegExp("from './"),
    `from './${dir}/`
  );

  return fs.writeFile(`${destAbsolutePath}/index.js`, newContent);
}
