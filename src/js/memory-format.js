define(function(){
    return function(bytes, multiple) {
        if (multiple) {
            bytes *= multiple;
        }

        if (!isFinite(bytes)) {
            return String(bytes);
        }

        var magnitude = Math.abs(bytes);

        if (magnitude >= 1099511627776) {
            return (bytes / 1099511627776).toFixed(1) + ' TB';
        } else if (magnitude >= 1073741824) {
            return (bytes / 1073741824).toFixed(1) + ' GB';
        }
        else if (magnitude >= 1048576) {
            return (bytes / 1048576).toFixed(1) + ' MB';
        }
        else if (magnitude >= 1024) {
            return (bytes / 1024).toFixed(1) + ' KB';
        }

        return Number(bytes).toFixed(0) + ' B';
    };
});