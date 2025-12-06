cd ./packages/papayaui
set -e
npm publish --access=public --registry=https://registry.npmjs.org
rm ./global.d.ts
rm ./README.md