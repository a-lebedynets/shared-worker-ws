let socket;
let connections = [];
// onconnect = function (e) {
//     console.log(e.ports);
//     var port = e.ports[0];

//     console.log(socket);

//     if (!socket) {

//         socket = new WebSocket("ws:localhost:8080");

//         socket.onopen = function (e) {
//             console.log("[open] Соединение установлено");
//         };

//         socket.onmessage = (event) => {
//             console.log(event.data);
//             port.postMessage(event.data);
//         };

//         socket.onclose = function () {
//             console.info('[close] Соединение прервано');
//         };

//         socket.onerror = function (error) {
//             console.error(`[error] ${error.message}`);
//         };
//     }

//     // port.onmessage = (e) => port.postMessage(e);

// }

self.addEventListener("connect", e => {
    console.log(e.ports[0]);
    connections.push(e.ports[0]);
    console.log(connections);

    // e.source.addEventListener("message", ev => {
    //     if (ev.data === "start") {
    //         if (connected === false) {
    //             e.source.postMessage('worker init');
    //             connected = true;
    //         } else {
    //             e.source.postMessage('worker already inited');
    //         }
    //     }
    // }, false);
    e.source.start();

    if (!socket) {

        socket = new WebSocket("ws:localhost:8080");

        socket.onopen = function (e) {
            console.log("[open] Соединение установлено");
        };

        socket.onmessage = (event) => {
            console.log(event.data);
            connections.forEach(port => port.postMessage(event.data));
        };

        socket.onclose = function () {
            console.info('[close] Соединение прервано');
        };

        socket.onerror = function (error) {
            console.error(`[error] ${error.message}`);
        };
    }
}, false);