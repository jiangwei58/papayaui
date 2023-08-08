set -e

npm run build:h5

rm -rf ./docs/public/*

mv ./dist/build/h5/* ./docs/public/

cd ./docs

npm run docs:build