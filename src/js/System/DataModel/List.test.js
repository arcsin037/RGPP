describe('List', function() {
	"use strict";
	var expect = expect || require('chai').expect,
		assert = assert || require('assert'),
		RGPP = require("./List");
	describe("#push", function() {
		it ('push Number', function() {
			var list = RGPP.System.List();
			list.push(0);
			expect(list.data(0)).to.equal(0);
		});
	});
});