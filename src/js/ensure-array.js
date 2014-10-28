define(['underscore'],
    /**
     * @exports ensure-array
     */
    function(_){
        //noinspection UnnecessaryLocalVariableJS
        /**
         * @desc Function which ensures an array is present. Useful for dealing with the results of JSON serialized
         * using the Badgerfish convention
         * @param {*} value Value to ensure is an array
         * @returns {Array} value if value is an array, a singleton array containing value for truthy values, and the
         * empty array for falsy values
         */
        var ensureArray = function(value) {
            if(_.isArray(value)) {
                return value;
            }
            else if(value) {
                return [value];
            }
            else {
                return [];
            }
        };

        return ensureArray;
});