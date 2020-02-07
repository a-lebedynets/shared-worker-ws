const express = require('express');
const app = express();
const ws = require('./websocket');

const wsConnection = ws.createWs();

app.use(express.static('public'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
