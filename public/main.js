if (window.Worker) {

    function createNode(text) {
        const node = document.createElement('p');
        node.innerText = text;
        return node;
    }

    const wsContainer = document.getElementById('ws');

    var myWorker = new Worker("worker.js");

    document.getElementById("name").onchange = function () {
        myWorker.postMessage(["123"]);
    };

    myWorker.onmessage = function ({ data }) {
        wsContainer.appendChild(createNode(data));
    };
}