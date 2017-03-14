/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/escape-with-links'
], function(escapeWithLinks) {
    'use strict';

    describe('escapeWithLinks', function() {
        it('returns undefined when the input is undefined', function() {
            expect(escapeWithLinks(undefined)).toEqual(undefined);
        });

        it('returns null when the input is null', function() {
            expect(escapeWithLinks(null)).toEqual(null);
        });

        it('returns 0 when the input is 0', function() {
            expect(escapeWithLinks(0)).toEqual(0);
        });

        it('returns false when the input is false', function() {
            expect(escapeWithLinks(false)).toEqual(false);
        });

        it('returns the empty string when the input is the empty string', function() {
            expect(escapeWithLinks('')).toEqual('');
        });

        it('recognises links with non-latin characters and uriEncodes the href attribute', function() {
            var href = 'https://hi.wikipedia.org/wiki/\u092d\u093e\u0930\u0924\u0940\u092f\u005f\u0935\u093f\u0936\u093f\u0937\u094d\u091f\u005f\u092a\u0939\u091a\u093e\u0928\u005f\u092a\u094d\u0930\u093e\u0927\u093f\u0915\u0930\u0923';
            var input = '& ' + href;
            var expectedOutput = '&amp; <a class="hyperlink" target="_blank" href="' + encodeURI(href) + '">' + href + '</a>';

            expect(escapeWithLinks(input, false, null, 'hyperlink')).toEqual(expectedOutput);
        });

        it('recognises links with non-latin characters and spaces, and uriEncodes the href attribute', function() {
            var href = 'http://www.example.com/\u092d\u093e\u0930\ \u0940\u092f';
            var input = '& ' + href;
            var expectedOutput = '&amp; <a class="hyperlink" target="_blank" href="' + encodeURI(href) + '">' + href + '</a>';

            expect(escapeWithLinks(input, true, null, 'hyperlink')).toEqual(expectedOutput);
        });

        describe('for http links with spaces in them', function() {
            beforeEach(function() {
                this.input = 'before http://example with spaces.com/ after';
            });

            it('with a target, and a className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="demoClassName" target="demoTarget" href="http://example%20with%20spaces.com/%20after">http://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, 'demoTarget', 'demoClassName');

                expect(output).toEqual(expectedOutput);
            });

            it('with a target, and no className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="autoLink" target="demoTarget" href="http://example%20with%20spaces.com/%20after">http://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, 'demoTarget', null);

                expect(output).toEqual(expectedOutput);
            });

            it('with no target, and a className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="demoClassName" target="_blank" href="http://example%20with%20spaces.com/%20after">http://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, null, 'demoClassName');

                expect(output).toEqual(expectedOutput);
            });

            it('with no target, and no className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="autoLink" target="_blank" href="http://example%20with%20spaces.com/%20after">http://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, null, null);

                expect(output).toEqual(expectedOutput);
            });
        });

        describe('for http links without spaces in them', function() {
            beforeEach(function() {
                this.input = 'before http://example.com/ after';
            });

            it('with a target, and a className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="demoClassName" target="demoTarget" href="http://example.com/">http://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, 'demoTarget', 'demoClassName');

                expect(output).toEqual(expectedOutput);
            });

            it('with a target, and no className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="autoLink" target="demoTarget" href="http://example.com/">http://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, 'demoTarget', null);

                expect(output).toEqual(expectedOutput);
            });

            it('with no target, and a className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="demoClassName" target="_blank" href="http://example.com/">http://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, null, 'demoClassName');

                expect(output).toEqual(expectedOutput);
            });

            it('with no target, and no className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="autoLink" target="_blank" href="http://example.com/">http://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, null, null);

                expect(output).toEqual(expectedOutput);
            });
        });

        describe('for https links with spaces in them', function() {
            beforeEach(function() {
                this.input = 'before https://example with spaces.com/ after';
            });

            it('with a target, and a className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="demoClassName" target="demoTarget" href="https://example%20with%20spaces.com/%20after">https://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, 'demoTarget', 'demoClassName');

                expect(output).toEqual(expectedOutput);
            });

            it('with a target, and no className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="autoLink" target="demoTarget" href="https://example%20with%20spaces.com/%20after">https://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, 'demoTarget', null);

                expect(output).toEqual(expectedOutput);
            });

            it('with no target, and a className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="demoClassName" target="_blank" href="https://example%20with%20spaces.com/%20after">https://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, null, 'demoClassName');

                expect(output).toEqual(expectedOutput);
            });

            it('with no target, and no className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="autoLink" target="_blank" href="https://example%20with%20spaces.com/%20after">https://example with spaces.com/ after</a>';
                var output = escapeWithLinks(this.input, true, null, null);

                expect(output).toEqual(expectedOutput);
            });
        });

        describe('for https links without spaces in them', function() {
            beforeEach(function() {
                this.input = 'before https://example.com/ after';
            });

            it('with a target, and a className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="demoClassName" target="demoTarget" href="https://example.com/">https://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, 'demoTarget', 'demoClassName');

                expect(output).toEqual(expectedOutput);
            });

            it('with a target, and no className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="autoLink" target="demoTarget" href="https://example.com/">https://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, 'demoTarget', null);

                expect(output).toEqual(expectedOutput);
            });

            it('with no target, and a className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="demoClassName" target="_blank" href="https://example.com/">https://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, null, 'demoClassName');

                expect(output).toEqual(expectedOutput);
            });

            it('with no target, and no className appropriate output is returned', function() {
                var expectedOutput = 'before <a class="autoLink" target="_blank" href="https://example.com/">https://example.com/</a> after';
                var output = escapeWithLinks(this.input, false, null, null);

                expect(output).toEqual(expectedOutput);
            });
        });

        describe('given input with no links', function() {
            it('should return text unaltered', function() {
                expect(escapeWithLinks('today while running to the store a leopard bit me')).toEqual('today while running to the store a leopard bit me');
            });

            it('should return input as a string', function() {
                expect(escapeWithLinks(420666)).toEqual('420666');
            });
        });

        describe('given input with a link and adjacent punctuation (catchSpaces false)', function() {
            it('should handle a comma after the link', function() {
                var input = 'http://example.com, Test';
                var expectedOutput = '<a class="autoLink" target="_blank" href="http://example.com">http://example.com</a>, Test';

                expect(escapeWithLinks(input, false)).toEqual(expectedOutput);
            });
        });

        describe('corner cases', function() {
            it('should handle bare wikipedia links', function() {
                var input = "https://en.wikipedia.org/wiki/Nirvana_(band)#In Utero, final months, and Cobain's death";
                var expectedOutput = '<a class="autoLink" target="_blank" href="https://en.wikipedia.org/wiki/Nirvana_(band)#In%20Utero,%20final%20months,%20and%20Cobain&#x27;s%20death">https://en.wikipedia.org/wiki/Nirvana_(band)#In Utero, final months, and Cobain&#x27;s death</a>';

                expect(escapeWithLinks(input, true)).toEqual(expectedOutput);
            });

            it('should handle wikipedia links embedded in text', function() {
                var input = "here is a great article: https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain's_death, i cry everytiem";
                var expectedOutput = 'here is a great article: <a class="autoLink" target="_blank" href="https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain&#x27;s_death">https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain&#x27;s_death</a>, i cry everytiem';

                expect(escapeWithLinks(input, false)).toEqual(expectedOutput);
            });

            it('should handle links wrapped in brackets', function() {
                var input = "here is a great article: (https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain's_death), i cry everytiem";
                var expectedOutput = 'here is a great article: (<a class="autoLink" target="_blank" href="https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain&#x27;s_death">https://en.wikipedia.org/wiki/Nirvana_(band)#In_Utero,_final_months,_and_Cobain&#x27;s_death</a>), i cry everytiem';

                expect(escapeWithLinks(input, false)).toEqual(expectedOutput);
            });

            it('should handle links with characters right up the http://', function() {
                var input = "hhttp://auto.howstuffworks.com/airbag.htm, Testing";
                var expectedOutput = 'h<a class="autoLink" target="_blank" href="http://auto.howstuffworks.com/airbag.htm">http://auto.howstuffworks.com/airbag.htm</a>, Testing';

                expect(escapeWithLinks(input, false)).toEqual(expectedOutput);
            });
        });
    });
});
