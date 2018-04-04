const concat = require('concat');

concat([
    "src/main/core/header.js",
    "src/main/js/notifier/Event.js",
    "src/main/js/notifier/Notifier.js",
    "src/main/js/notifier/Receiver.js",
    "src/main/js/worker/SuperWorker.js",
    "src/main/js/worker/XhrWorker.js",
    "src/main/js/util/ScriptLoader.js",
    "src/main/js/index.js",
    "src/main/js/App.js",
    "src/main/core/footer.js"
], "build/bundle.js");
