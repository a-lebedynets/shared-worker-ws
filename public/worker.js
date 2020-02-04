onmessage = function (e) {
    console.log('Worker: Message received from main script');
    console.log(e);

    let socket = new WebSocket("ws:localhost:8080");

    socket.onopen = function (e) {
        console.log("[open] Соединение установлено");
    };

    socket.onmessage = (event) => {
        console.log(event.data);
        self.postMessage(event.data);
    };

    socket.onclose = function () {
        console.info('[close] Соединение прервано');
    };

    socket.onerror = function (error) {
        console.error(`[error] ${error.message}`);
    };
}