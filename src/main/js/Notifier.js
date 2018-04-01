declare().as('Notifier').module(function() {
    var receivers = [],
        once = [];

    var notify = function(arr, event) {
        for (var i = arr.length; i--;) {
            var receiver = arr[i];
            receiver[event.name].call(this, event.body);
        }
    }.bind(this);

    this.add = function(receiver) {
        receivers.unshift(receiver);
    };

    this.addOnce = function(receiver) {
        once.unshift(receiver);
    };

    this.notify = function(event) {
        notify(once, event);
        once = [];
        notify(receivers, event);
    };

    return this;
});
