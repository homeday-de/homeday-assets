const fs = require('fs').promises;
const copy = require('recursive-copy');
const packageJson = require('../../package.json');
const PROJECT_CONFIG = require('../CONFIG');

const ASSETS_PATH = `${process.cwd()}/${PROJECT_CONFIG.ASSETS_DIR}`;
const DIST_PATH = `${process.cwd()}/${PROJECT_CONFIG.DIST_DIR}`;

(async () => {
  console.log('📦 Building the project');
  await deleteDistDir();
  await copyAssets();
  await copyPackageJson();
  console.log('✅ Building done!');
})();

async function deleteDistDir() {
  await fs.rmdir(DIST_PATH, { recursive: true });
}

async function copyAssets() {
  await copy(ASSETS_PATH, DIST_PATH);
}

async function copyPackageJson() {
  // We adjust the main/entry file to match the new structure
  const newPackageJson = {
    ...packageJson,
    main: './index.js',
    module: './index.js',
  };

  await fs.writeFile(
    `${DIST_PATH}/package.json`,
    JSON.stringify(newPackageJson, null, 2)
  );
}
