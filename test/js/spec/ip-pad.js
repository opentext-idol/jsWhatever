define([
    'js-whatever/js/ip-pad'
], function(ipPad) {

    describe('IP Pad', function() {

        it('should leave falsy values unchanged', function() {
            expect(ipPad(undefined)).toBe(undefined);
            expect(ipPad(null)).toBe(null);
            expect(ipPad('')).toBe('');
        });

        it('should leave IPv4 addresses with 3 digits in each block unchanged', function() {
            expect(ipPad('255.255.255.255')).toBe('255.255.255.255');
        });

        it('should add leading zeroes to blocks in IPv4 addresses with fewer than 3 digits', function() {
            expect(ipPad('5.255.255.255')).toBe('005.255.255.255');
            expect(ipPad('255.5.255.255')).toBe('255.005.255.255');
            expect(ipPad('255.255.5.255')).toBe('255.255.005.255');
            expect(ipPad('255.255.255.5')).toBe('255.255.255.005');
        });

        it('should add leading zeroes to multiple blocks', function() {
            expect(ipPad('5.5.5.5')).toBe('005.005.005.005');
        });

    });

});