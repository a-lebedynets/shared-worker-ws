const WebSocket = require('ws');

let connections = [];

let _width, _height;

const createWs = () => {
    try {
        const wsServer = new WebSocket.Server({ port: 8080 });
        wsServer.on('connection', function connection(ws) {
            connections.push(ws);
            console.log('WS connected');
            // ws.on('message', function incoming(message) {
            //     console.log('received: %s', message);
            // });
            ws.on('message', (data) => {
                try {
                    const messageData = JSON.parse(data);
                    _width = messageData.width;
                    _height = messageData.height;

                    setInterval(() => {
                        ws.send(JSON.stringify({
                            color: generateColor(),
                            width: getSizeByDiapason(50, _width),
                            height: getSizeByDiapason(50, _height),
                        }));
                    }, 3000);
                } catch (error) {
                    console.log(error);
                }
            });
        });

        wsServer.on('close', () => {
            console.log('WS closed');
            clearInterval(wsServer.__interval);
        });



        return wsServer;
    } catch (error) {
        console.error(error);
    }

}

function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function getSizeByDiapason(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports.createWs = createWs;