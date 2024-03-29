var Notifier = use('Notifier');
var Event    = use('Event');
var Loader   = use('ScriptLoader');

// declare().as('App').extends(notifier).module({
//     settings: function(config) {
//         this.notify({
//             name: Event.Settings,
//             body: config
//         });
//
//         return this;
//     }
// });

declare().as('mTrx').module((function() {
    var notifier = new Notifier();

    return {
        constructor: function() {
            log('[App] init');
        },
        scripts: function(list) {
            Loader.loadScripts(list).then(function(result) {
                log('[App]', result);

            });
            return this;
        },
        settings: function(config) {
            notifier.notify({
                name: Event.Settings,
                body: config
            });

            return this;
        }
    };
})()).export();

//window.mTrx = use('App');

mTrx.scripts([
    'http://rgr-myrg.github.io/www/sandbox/build/lib/tracking/mux.js',
    'http://rgr-myrg.github.io/www/sandbox/build/lib/tracking/comscore/comscore.streaming.6.1.1.171219.min.js'
    ])
    .settings({});
