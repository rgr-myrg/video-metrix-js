(function(m) {
var _function_ = 'function',
    _object_ = 'object';

var factory = function(obj){
	var base = {}, sub = {};

	if (typeof obj.extends === _function_) {
		try {
            base = new obj.extends();
        } catch(e) {}
	} else if (typeof obj.extends === _object_) {
		base = obj.extends;
    }

	if (typeof obj.instance === _function_) {
		try {
            sub = new obj.instance();
        } catch(e) {}

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

	if (typeof sub.constructor === _function_) {
		try{
            sub.constructor();
        }catch(e){}
    }

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
            m[name] = (base !== null)
                ? factory({
                    extends: base,
                    instance: mod
                })
                : mod;
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
