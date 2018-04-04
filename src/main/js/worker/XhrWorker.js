var SuperWorker = use('SuperWorker');

declare().as('XhrWorker').extends(SuperWorker).module({
    build: function() {
        var xmlHttp = [
            'MSXML2.XmlHttp.5.0',
            'MSXML2.XmlHttp.4.0',
            'MSXML2.XmlHttp.3.0',
            'MSXML2.XmlHttp.2.0',
            'Microsoft.XmlHttp'
        ];

        var loadResource = function(url) {
            var xhr = null;

            if (typeof XMLHttpRequest !== 'undefined') {
                xhr = new XMLHttpRequest();

            } else {
                for (var i = xmlHttp.length; i--;) {
                    try {
                        xhr = new ActiveXObject(xmlHttp[i]);
                        break;
                    } catch (e) {}
                }
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState < 4 || xhr.status !== 200) {
                    return;
                }

                if (xhr.readyState === 4) {
                    postMessage({
                        uri: 'xhr:ready',
                        data: xhr.responseText
                    });
                }
            };

            //url = url.replace(/^http:|^https:/gi, '');

            xhr.open('GET', url, true);
            xhr.send('');
        };

        addEventListener('message', function(message) {
            var data = message.data;

            if (typeof data === 'object' && data.uri && data.uri === 'xhr:load' && data.url) {
                loadResource(data.url);
            }
        });
    }
});
