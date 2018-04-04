declare().as('ScriptLoader').module((function() {
    var scriptElement = null,
        scriptSrc     = null,
        scriptType    = 'text/javascript',
        scriptAsync   = true,
        scriptOnReady = Function.prototype;

    var xhrWorker = use('XhrWorker').getWorkerInstance(),
        scripts   = [],
        callback  = Function.prototype;

    var bulkLoad = function(scripts) {
        var onWorkerResponse = function(response) {
            if (scripts.length === 0) {
                callback(response);
            } else {
                loadNextScript();
            }
        }.bind(this);

        var loadNextScript = function() {
            xhrWorker.postMessage({
                uri: 'xhr:load',
                url: scripts.shift()
            });
        }.bind(this);

        xhrWorker.addEventListener(_messsage_, function(message) {
            console.log('response', message.data);
            onWorkerResponse(message.data);
        });

        loadNextScript();
    };

    return {
        loadScripts: function(list) {
            scripts = list;
            return this;
        },
        then: function(fn) {
            callback = fn;
            bulkLoad(scripts);
        }
    };
})());
