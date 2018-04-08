declare().as('ScriptLoader').module((function() {
    var scriptElement = null,
        scriptOnReady = Function.prototype;

    var xhrWorker = use('XhrWorker').getWorkerInstance(),
        scripts   = [],
        callback  = Function.prototype;

    var bulkLoad = function(scripts) {
        var onWorkerResponse = function(response) {
            /* DOM inject scripts */
            var script = document.createElement('script');

            script.type = 'text/javascript';
            script.text = response.data;

            document.querySelector('head').appendChild(script);

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
