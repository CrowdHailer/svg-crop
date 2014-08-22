var readSVG = require('./lib/readDimensions');
var BBox = require('bbox');
var interpolate = require('interpolate');
var fs = require('fs')

var STRING_TEMPLATE = 'inkscape --export-area={x0}:{y0}:{x1}:{y1} --export-png=www/{output} --export-height={height} {raw}'; 

module.exports = function(array, originalPath){
    var raw = fs.readFileSync(originalPath)
    readSVG(raw, function(container){
        array.forEach(function (copyDimensions) {
            var cutOut = BBox.fit(container, BBox.create(copyDimensions.width, copyDimensions.height));
            var str = interpolate(STRING_TEMPLATE, {
                x0: cutOut.x0,
                y0: cutOut.y0,
                x1: cutOut.x1,
                y1: cutOut.y1,
                output: copyDimensions.path,
                height: copyDimensions.height,
                raw: originalPath,
            })
            console.log(str)
        })
    })
}