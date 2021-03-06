'use strict';

var BBox = require('bbox');
var parseString = require('xml2js').parseString;

module.exports = function (xml, callback) {
    parseString(xml, function (err, data) {
        console.log(err);
        var viewbox, arr, output;
        viewbox = data.svg.$.viewBox;
        if (viewbox) {
            arr = viewbox.split(' ').map(function (i) {
                return parseInt(i, 10);
            });
        } else {
            arr = [0, 0, parseInt(data.svg.$.width, 10), parseInt(data.svg.$.height, 10)];
        }
        output = BBox.create.apply({}, arr);
        callback(output);
    });
};