var BBox = require('bbox');
var parseString = require('xml2js').parseString;

module.exports = function (xml, callback) {
    parseString(xml, function (err, data) {
        var viewbox, arr;
        viewbox = data.svg.$.viewBox;
        if (viewbox) {
            arr = viewbox.split(' ').map(function(i){
                return parseInt(i, 10);
            });
        } else {
            arr = [0 , 0, parseInt(data.svg.$.width, 10), parseInt(data.svg.$.height, 10)];
        }
        var output = BBox.create.apply({}, arr);
        callback(output);
    })
}