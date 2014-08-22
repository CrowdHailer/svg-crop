var readSVG, BBox, dummy, shellDummy, crop, proxyquire, shellStub;


beforeEach(function () {
    shellDummy = jasmine.createSpy();
    shellStub = {
        exec: function (command) {
            shellDummy(command);
        }
    }
    proxyquire = require('proxyquire');
    readSVG = require('./lib/readDimensions');
    crop = proxyquire('./index', {'shelljs': shellStub});
    BBox = require('bbox');
    dummy = jasmine.createSpy()
});

describe('Reading and SVGs dimensions', function () {
    it('should read viewBox attribute if available', function () {
        readSVG('<?xml version="1.0" encoding="utf-8"?><svg viewBox="0 0 200 100"></svg>', dummy)
        expect(dummy.calls.mostRecent().args).toEqual([BBox.create(0, 0, 200, 100)]);
    });

    it('should read page size if available', function () {
        readSVG('<?xml version="1.0" encoding="utf-8"?><svg width="400" height="300"></svg>', dummy)
        expect(dummy).toHaveBeenCalledWith(BBox.create(0, 0, 400, 300));
    });
});

describe('Sending commands', function () {
    it('should log each command that gets executed', function () {
        crop([{path: 'a', width: 200, height: 100}, {path: 'b', width: 100, height: 100}], 'fixture/blank.svg')
        expect(shellDummy).toHaveBeenCalledWith('inkscape --export-area=0:0:200:100 --export-png=www/a --export-height=100 fixture/blank.svg')
        expect(shellDummy).toHaveBeenCalledWith('inkscape --export-area=50:0:150:100 --export-png=www/b --export-height=100 fixture/blank.svg')
    });
});