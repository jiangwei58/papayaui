set -e

npm run build:h5

mkdir -p ./docs/public

rm -rf ./docs/public/*

mv ./dist/build/h5/* ./docs/public/

cd ./docs

pnpm install

npm run docs:build