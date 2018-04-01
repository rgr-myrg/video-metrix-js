(function(m) {
var declare = function() {
    var name;

    return {
        as: function(modName) {
            name = modName;
            return this;
        },
        module: function(fn) {
            m[name] = fn;
        }
    };
};

var use = function(name) {
    return m[name];
};

var debug = true;

var timestamp = (function() {
    var pad = function(n) {
        return n < 10 ? '0' + n : n;
    }

    return {
        now: function() {
            var date = new Date();
            return [
                pad(date.getHours()),
                date.getMinutes(),
                pad(date.getSeconds()) + '.' + date.getMilliseconds()
            ].join(':');
        }
    };
})();

var log = function() {
    console.log('[' + timestamp.now() + '] ', arguments);
};
