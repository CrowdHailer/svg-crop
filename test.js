var readSVG, BBox, dummy;

beforeEach(function () {
    readSVG = require('./index');
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