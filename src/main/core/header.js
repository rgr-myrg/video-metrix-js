(function(_top_) {
/* String constants */
var _function_ = 'function',
    _object_   = 'object',
    _messsage_ = 'message';

var instantiate = function(poly) {
    return typeof poly === _function_ ? new poly() : poly;
};

var factory = function(superClass, subClass) {
    var base = instantiate(superClass),
        sub  = instantiate(subClass);

    for (var i in base) {
        if (base.hasOwnProperty(i)) {
            if (!sub[i]) {
                sub[i] = base[i];
            }
        }
    }

    return sub;
};

var declare = function() {
    var name = superClass = null;

    return {
        as: function(_name_) {
            name = _name_;
            return this;
        },

        extends: function(_super_) {
            superClass = _super_;
            return this;
        },

        module: function(_this_) {
            if (!_this_) return;

            _top_[name] = (superClass !== null)
                        ? factory(superClass, _this_)
                        : _this_;

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
