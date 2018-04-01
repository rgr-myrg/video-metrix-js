const concat = require('concat');

concat([
    "src/main/core/header.js",
    "src/main/js/Event.js",
    "src/main/js/Notifier.js",
    "src/main/js/Receiver.js",
    "src/main/js/index.js",
    "src/main/core/footer.js"
], "build/bundle.js");
