define(function () {

    //  This mock models function dependencies that require stubbing
    //  We need to delegate to an implementation that is actually stub-able

    var functionMock = function () {
        var mock = function () {
            return mock.impl.apply(this, arguments);
        };

        mock.impl = function () {
            throw new Error('Stub implementation required.');
        };

        return mock;
    };

    return functionMock;
});