/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'test/mock/function-mock',
	'real/js/regex-replace'
], function (FunctionMock, realRegexReplace) {
    var mock = new FunctionMock()
	mock.impl = realRegexReplace
	return mock
});
