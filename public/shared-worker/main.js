
if (!!window.SharedWorker) {
    // function createNode(text) {
    //     const node = document.createElement('p');
    //     node.innerText = text;
    //     return node;
    // }

    // const wsContainer = document.getElementById('ws');

    var myWorker = new SharedWorker("./shared-worker/shared-worker.js");
    // myWorker.port.start();

    // document.getElementById("name").onchange = function () {
    //     myWorker.port.postMessage({ 1: 1 });
    //     console.log('Message posted to worker');
    // }

    // console.log(myWorker.port);

    myWorker.port.onmessage = function (message) {
        // result2.textContent = e.data;
        // wsContainer.appendChild(createNode(e.data));
        // document.body.style.backgroundColor = e.data;
        const { color, width, height, radius } = JSON.parse(message.data);
        const node = document.getElementById('dynamic-block');
        node.style.backgroundColor = color;
        node.style.width = width + 'px';
        node.style.height = height + 'px';
        node.style.borderRadius = radius + 'px';

        document.body.style.backgroundColor = '#' + color.replace('#', '').split('').reverse().join('');

        console.log('Message received from worker');
    }

    myWorker.port.postMessage({ width: window.innerWidth, height: window.innerHeight });
}