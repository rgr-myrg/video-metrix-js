var Notifier = use('Notifier');
var Event = use('Event');

var notifier = new Notifier();
notifier.add({
    onPlayStart: function(e) {
        console.log('[start]', e);
    }
});

debug && log('index', Event);
debug && log('index', Event.PlayStart);

notifier.notify({
    name: Event.PlayStart,
    body: 'test'
});
