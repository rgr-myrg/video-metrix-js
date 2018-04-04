var Notifier = use('Notifier');
var Event = use('Event');
var XhrWorker = use('XhrWorker');

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

notifier.NAME = 'rpm';

declare().as('sub').extends(notifier).module({
    getName: function() {
        return this.NAME ? this.NAME : 'redwolf';
    }
});

declare().as('noti').extends(Notifier).module({
    constructor: function() {
        this.add(this);
        this.notify({
            name: Event.PlayStart,
            body: 'inner'
        });
    },
    onPlayStart: function(e) {
        console.log('[extended]', e);
    }
});

var worker = XhrWorker.getWorkerInstance();

worker.addEventListener(_messsage_, function(message) {
    console.log('response', message.data);
});
worker.postMessage({
    uri: 'xhr:load',
    url: 'https://jsonplaceholder.typicode.com/posts/1'
});
