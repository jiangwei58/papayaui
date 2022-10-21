node ./scripts/createPackage.mjs
yarn prettier --write ./src/lib/package.json
cp ./README.md ./src/lib/README.md