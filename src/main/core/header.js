(function(_top_) {
/* String constants */
var _function_ = 'function',
    _object_   = 'object',
    _messsage_ = 'message';

var factory = function(obj){
    var base = sub = {};

    if (typeof obj.extends === _function_) {
        base = new obj.extends();
    } else if (typeof obj.extends === _object_) {
        base = obj.extends;
    }

    if (typeof obj.instance === _function_) {
        sub = new obj.instance();
    } else if (typeof obj.instance === _object_) {
        sub = obj.instance;
    }

    for (var i in base) {
        if (base.hasOwnProperty(i)) {
            if (!sub[i]) {
                sub[i] = base[i];
            }
        }
    }

    // if (typeof sub.constructor === _function_) {
    //     sub.constructor();
    // }

    return sub;
};

var declare = function() {
    var name = base = null;

    return {
        as: function(modName) {
            name = modName;
            return this;
        },
        extends: function(baseClass) {
            base = baseClass;
            return this;
        },
        module: function(mod) {
            if (!mod) return;

            _top_[name] = (base !== null)
                ? factory({
                    extends: base,
                    instance: mod
                })
                : mod;

            if (typeof _top_[name].constructor === _function_) {
                _top_[name].constructor();
            }

            return this;
        },
        export: function() {
            if (window[name]) {
                return;
            }

            window[name] = _top_[name];
        }
    };
};

var use = function(name) {
    return _top_[name];
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
