const ipc = require('electron').ipcRenderer;
let output;
let errorHeader;
const { myConsole } = require('./utils/helpers.js');

function sendData(dataName, value) {
    if (value) {
        ipc.send(dataName, value);
    } else {
        ipc.send(dataName);
    }
}

document.addEventListener('DOMContentLoaded', function () {

    output = document.getElementById('output');
    errorHeader = document.getElementById('error');

    const execCode = document.getElementById('execCode');
    const inputCode = document.getElementById('inputCode');


    execCode.addEventListener('click', () => sendData('execCode', inputCode.value));

    addListeners();
});


function addListeners() {
    ipc.on('execCode-response', (_, data) => addLi(data));
}

function addLi(text) {
    const outputCode = document.getElementById('outputCode');
    outputCode.value = text;
}
