declare().as('SuperWorker').module({
    /* Must implement build method in subclass */
    getWorkerInstance: function() {
        var jsString = this.build.toString();

        jsString = jsString.substring(
            jsString.indexOf('{') + 1,
            jsString.lastIndexOf('}')
        );

        return new Worker(
            URL.createObjectURL(
                new Blob([jsString], {type: 'application/javascript'})
            )
        );
    }
});
