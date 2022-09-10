#!/usr/bin/env bash

VERSION=1.4.4

wget https://github.com/Roblox/roact/archive/refs/tags/v$VERSION.zip
unzip -o v$VERSION.zip
cp -r ./roact-$VERSION/src .
rm -rf ./src/Component.spec
rm -rf ./src/**/*.spec.lua
rm -rf ./src/*.spec.lua
rm -rf ./v$VERSION.zip
rm -rf ./roact-$VERSION
