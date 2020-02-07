let socket;
let connections = [];

onconnect = function (e) {
    e.source.start();
    connections.push(e.ports[0]);


    e.source.onmessage = (message) => {
        // console.log(width, height)
        // console.log(socket);

        if (socket) {
            socket.onopen = () => {
                console.log("Socket connected");
                socket.send(JSON.stringify(message.data));
            }
        }
    };

    if (!socket) {

        socket = new WebSocket("ws:localhost:8080");

        socket.onmessage = (event) => {
            console.log(event.data);
            event.data.radius = Math.floor(Math.random() * (100 - 3) + 3);
            connections.forEach(port => port.postMessage(event.data));
        };

        socket.onclose = () => console.info('Socket closed');
        socket.onerror = (error) => console.error(`[error] ${error.message}`);
    }

}
