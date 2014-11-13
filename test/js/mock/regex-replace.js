define([
    'test/mock/function-mock',
	'real/js/regex-replace'
], function (FunctionMock, realRegexReplace) {
    var mock = new FunctionMock()
	mock.impl = realRegexReplace
	return mock
});
