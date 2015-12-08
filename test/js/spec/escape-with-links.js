/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/escape-with-links',
    'underscore'
], function (escapeWithLinks, _) {

    describe('escapeWithLinks', function () {
        it('returns undefined when the input is undefined', function() {
            expect(escapeWithLinks(undefined)).toBe(undefined);
        });

        it('returns null when the input is null', function() {
            expect(escapeWithLinks(null)).toBe(null);
        });

        it('returns 0 when the input is 0', function() {
            expect(escapeWithLinks(0)).toBe(0);
        });

        it('returns false when the input is false', function() {
            expect(escapeWithLinks(false)).toBe(false);
        });

        it('returns the empty string when the input is the empty string', function() {
            expect(escapeWithLinks('')).toBe('');
        });

        it('recognises links with non-latin characters', function() {
            var href = 'https://hi.wikipedia.org/wiki/भारतीय_विशिष्ट_पहचान_प्राधिकरण';
            var input = '& ' + href;
            var expectedOutput = '&amp; <a class="hyperlink" target="_blank" href="' + href + '">' + href + '</a>';

            expect(escapeWithLinks(input, false, null, 'hyperlink')).toBe(expectedOutput);
        });

        describe('for http links with spaces in them', function() {
            beforeEach(function() {
                this.input = 'before http://example with spaces.com/ after';
            });

            it('with a target, and a className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="demoClassName" target="demoTarget" href="http://example with spaces.com/ after">http://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, 'demoTarget', 'demoClassName');

                expect(output).toBe(expectedOutput);
            });

            it('with a target, and no className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="autoLink" target="demoTarget" href="http://example with spaces.com/ after">http://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, 'demoTarget', null);

                expect(output).toBe(expectedOutput);
            });

            it('with no target, and a className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="demoClassName" target="_blank" href="http://example with spaces.com/ after">http://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, null, 'demoClassName');

                expect(output).toBe(expectedOutput);
            });

            it('with no target, and no className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="autoLink" target="_blank" href="http://example with spaces.com/ after">http://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, null, null);

                expect(output).toBe(expectedOutput);
            });
        });

        describe('for http links without spaces in them', function() {
            beforeEach(function() {
                this.input = 'before http://example.com/ after';
            });

            it('with a target, and a className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="demoClassName" target="demoTarget" href="http://example.com/">http://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, 'demoTarget', 'demoClassName');

                expect(output).toBe(expectedOutput);
            });

            it('with a target, and no className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="autoLink" target="demoTarget" href="http://example.com/">http://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, 'demoTarget', null);

                expect(output).toBe(expectedOutput);
            });

            it('with no target, and a className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="demoClassName" target="_blank" href="http://example.com/">http://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, null, 'demoClassName');

                expect(output).toBe(expectedOutput);
            });

            it('with no target, and no className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="autoLink" target="_blank" href="http://example.com/">http://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, null, null);

                expect(output).toBe(expectedOutput);
            });
        });

        describe('for https links with spaces in them', function() {
            beforeEach(function() {
                this.input = 'before https://example with spaces.com/ after';
            });

            it('with a target, and a className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="demoClassName" target="demoTarget" href="https://example with spaces.com/ after">https://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, 'demoTarget', 'demoClassName');

                expect(output).toBe(expectedOutput);
            });

            it('with a target, and no className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="autoLink" target="demoTarget" href="https://example with spaces.com/ after">https://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, 'demoTarget', null);

                expect(output).toBe(expectedOutput);
            });

            it('with no target, and a className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="demoClassName" target="_blank" href="https://example with spaces.com/ after">https://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, null, 'demoClassName');

                expect(output).toBe(expectedOutput);
            });

            it('with no target, and no className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="autoLink" target="_blank" href="https://example with spaces.com/ after">https://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, null, null);

                expect(output).toBe(expectedOutput);
            });
        });

        describe('for https links without spaces in them', function() {
            beforeEach(function() {
                this.input = 'before https://example.com/ after';
            });

            it('with a target, and a className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="demoClassName" target="demoTarget" href="https://example.com/">https://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, 'demoTarget', 'demoClassName');

                expect(output).toBe(expectedOutput);
            });

            it('with a target, and no className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="autoLink" target="demoTarget" href="https://example.com/">https://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, 'demoTarget', null);

                expect(output).toBe(expectedOutput);
            });

            it('with no target, and a className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="demoClassName" target="_blank" href="https://example.com/">https://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, null, 'demoClassName');

                expect(output).toBe(expectedOutput);
            });

            it('with no target, and no className appropriate output is returned', function () {
                var expectedOutput = 'before <a class="autoLink" target="_blank" href="https://example.com/">https://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, null, null);

                expect(output).toBe(expectedOutput);
            });
        });

        describe('given input with no links', function () {
            it('should return text unaltered', function () {
                expect(escapeWithLinks('today while running to the store a leopard bit me')).toBe('today while running to the store a leopard bit me');
            });

            it('should return input as a string', function() {
                expect(escapeWithLinks(420666)).toBe('420666');
            });
        });

        describe('given input with a link and adjacent punctuation (catchSpaces false)', function() {
            it('should handle a comma after the link', function() {
                var input = 'http://example.com, Test';
                var expectedOutput = '<a class="autoLink" target="_blank" href="http://example.com">http://example.com</a>, Test';

                expect(escapeWithLinks(input, false)).toBe(expectedOutput);
            });
        });

        describe('corner cases', function() {
            it('should handle bare wikipedia links', function() {
                var input = "https://en.wikipedia.org/wiki/Nirvana_(band)#In Utero, final months, and Cobain's death";
                var expectedOutput = '<a class="autoLink" target="_blank" href="https://en.wikipedia.org/wiki/Nirvana_(band)#In Utero, final months, and Cobain&#x27;s death">https://en.wikipedia.org/wiki/Nirvana_(band)#In Utero, final months, and Cobain&#x27;s death</a>';

                expect(escapeWithLinks(input, true)).toBe(expectedOutput);
            });

            it('should handle wikipedia links embedded in text', function() {
                var input = "here is a great article: https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain's_death, i cry everytiem";
                var expectedOutput = 'here is a great article: <a class="autoLink" target="_blank" href="https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain&#x27;s_death">https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain&#x27;s_death</a>, i cry everytiem';

                expect(escapeWithLinks(input, false)).toBe(expectedOutput);
            });

            it('should handle links wrapped in brackets', function() {
                var input = "here is a great article: (https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain's_death), i cry everytiem";
                var expectedOutput = 'here is a great article: (<a class="autoLink" target="_blank" href="https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain&#x27;s_death">https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain&#x27;s_death</a>), i cry everytiem';

                expect(escapeWithLinks(input, false)).toBe(expectedOutput);
            });

            it('should handle links with characters right up the http://', function() {
                var input = "hhttp://auto.howstuffworks.com/airbag.htm, Testing";
                var expectedOutput = 'h<a class="autoLink" target="_blank" href="http://auto.howstuffworks.com/airbag.htm">http://auto.howstuffworks.com/airbag.htm</a>, Testing';

                expect(escapeWithLinks(input, false)).toBe(expectedOutput);
            });
        });
    });
});
