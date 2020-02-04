
if (!!window.SharedWorker) {
    function createNode(text) {
        const node = document.createElement('p');
        node.innerText = text;
        return node;
    }

    const wsContainer = document.getElementById('ws');

    var myWorker = new SharedWorker("./shared-worker/worker.js");
    myWorker.port.start();

    document.getElementById("name").onchange = function () {
        myWorker.port.postMessage({ 1: 1 });
        console.log('Message posted to worker');
    }

    console.log(myWorker.port);

    myWorker.port.onmessage = function (e) {
        // result2.textContent = e.data;
        wsContainer.appendChild(createNode(e.data));
        console.log('Message received from worker');
    }

    // myWorker.port.postMessage(['123']);
}