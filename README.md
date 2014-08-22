SVG Crop
========

#### Output PNG's at a variety of size's and aspect ratios from a single SVG source.

Installation
============

SVG crop is available as a package on npm.
Requires inkscape installed. Also available on npm.

```
$ npm install -g inkscape // if required

$ npm install svg-crop
```

Use
===

SVG crop has only a single method. Required parameters are an array of output sizes and locations and a path to the original svg

Example
```js
var crop = require('svg-crop');

var sizes = [
    {path: 'output/landscape.png', width: 200, height: 100},
    {path: 'output/portrait.png', width: 100, height: 200}
];

var originalPath = 'input/original.svg';

crop(sizes, originalPath);
```

TODO's
======

This package is functional but I hope to add a few more key features soon

- Set container to a svg element by parsing in id parameter
- CLI reads array from json file
- have option to set crop template to surround container rather than fit within.