var express = require('express');
var app = express();

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws) {
    console.log('WS connected');
    // ws.on('message', function incoming(message) {
    //     console.log('received: %s', message);
    // });

    setInterval(() => {
        ws.send('Hi! ' + Math.random());
    }, 3000);
});

app.use(express.static('public'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});