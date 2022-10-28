node ./scripts/createPackage.mjs
yarn prettier --write ./src/packages/package.json
cp ./README.md ./src/packages/README.md