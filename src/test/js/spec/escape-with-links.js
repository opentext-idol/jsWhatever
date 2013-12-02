define([
    'js-utils/js/escape-with-links',
    'js-utils/js/regex-replace',
    'real/js/regex-replace',
    'sinon',
    'underscore'
], function (escapeWithLinks, regexReplace, realRegexReplace) {

    describe('Utility: escapeWithLinks', function () {
        describe('applying with falsy text', function () {
            it('should render the identity function', function () {
                _.each([void 0, null, 0, false, ''], function (value) {
                    expect(escapeWithLinks(value)).toBe(value);
                });
            });
        });


        var checkRegexReplaceInput = function (input, url, link) {

            return function (reg, text, html, escape) {

                it('send regexReplace valid input', function () {
                    expect(text).toBe(input);
                    expect(input).toMatch(reg);
                    expect(html(url)).toBe(link);
                    expect(escape).toBe(_.escape);
                });

                return realRegexReplace(reg, text, html, escape);
            };
        };


        var URL_WITH_SPACES = 'http://example with spaces.com/';
        var URL_WITHOUT_SPACES = 'http://examplewithoutspaces.com/';

        var performTest = function (shouldCatchSpaces, useTarget, useClassName) {
            var url   = shouldCatchSpaces ? URL_WITH_SPACES : URL_WITHOUT_SPACES;
            var input = 'before ' + url + '\n after';

            var target    = useTarget    ? 'demoTarget'    : null;
            var className = useClassName ? 'demoClassName' : null;

            var expectedTarget    = useTarget    ? target    : '_blank';
            var expectedClassName = useClassName ? className : 'autoLink';

            var escapedUrl = _.escape(url);
            var link       = '<a class="' + expectedClassName + '" target="' + expectedTarget + '" href="' + escapedUrl + '">' + escapedUrl + '</a>';
            var output     = 'before ' + link + '\n after';

            sinon.stub(regexReplace, 'impl', checkRegexReplaceInput(input, url, link));

            var actualOutput;
            describe('should execute correctly and', function () {
                actualOutput = escapeWithLinks(input, shouldCatchSpaces, target, className);
            });

            regexReplace.impl.restore();

            it('should give the correct output', function () {
                expect(actualOutput).toBe(output);
            });
        };


        var describeTest = function (shouldCatchSpaces, useTarget, useClassName) {
            var description = [
                shouldCatchSpaces  ? 'truthy catchSpaces' : 'falsy catchSpaces',
                useTarget          ? 'defined target'     : 'null target',
                useClassName       ? 'defined className'  : 'null className'
            ];
            describe(description.join(' and  '), function () {
                performTest(shouldCatchSpaces, useTarget, useClassName);
            });
        };


        describe('applying with valid text and', function () {
            //  For every possible combination of input -> Describe a test
            var values = [true, false];
            _.each(values, function (shouldCatchSpaces) {
                _.each(values, function (useTarget) {
                    _.each(values, function (useClassName) {
                        describeTest(shouldCatchSpaces, useTarget, useClassName);
                    });
                });
            });
        });
    });
});