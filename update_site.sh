#!/bin/sh

mkdir -p tmp/
git clone https://github.com/vinisketch/VSToolkit.git tmp
rm -rf vstoolkit/css
rm -rf vstoolkit/js
mv tmp/lib/css vstoolkit
mv tmp/lib/js vstoolkit
rm -rf tmp

mkdir -p tmp/
git clone https://github.com/bendr/bender.git tmp
mv tmp/dom/bender.js bender
mv tmp/dom/flexo.js bender
rm -rf tmp

mkdir -p tmp/
git clone https://github.com/dthevenin/Nibbler.git tmp
mv tmp/lib .
mv tmp/demos .
rm -rf tmp
