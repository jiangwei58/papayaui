set -e

npm run build:h5

mkdir -p ./docs/public

rm -rf ./docs/public/*

mv ./dist/build/h5/* ./docs/public/

mv ./docs/public/index.html ./docs/public/mobile.html

cd ./docs

pnpm install

npm run docs:build