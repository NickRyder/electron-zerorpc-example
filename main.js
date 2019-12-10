const { app, BrowserWindow } = require('electron');
const zerorpc = require("zerorpc");
const ipc = require('electron').ipcMain;
const fs = require('fs');
const { spawn } = require('child_process');
const { myConsole } = require('./utils/helpers.js');

let ui;
let spawnedChild;
let zerorpcClient;

app.on('window-all-closed', () => {
    if (spawnedChild) {
        spawnedChild.stdin.pause();
        spawnedChild.kill();
    }
    app.quit();
})

app.on('ready', () => {
    spawnPythonServer();
    ui = new BrowserWindow({
        height: 1024,
        width: 1075,
        resizable: true
    });
    ui.loadURL('file://' + __dirname + '/index.html');

    ui.on('closed', () => {
        app.quit();
    });
});

function spawnPythonServer() {
    spawnedChild = spawn('python3', ['-i', 'zerorpc-server.py']);

    spawnedChild.on('close', (code, signal) => {
        console.log(`child error: ${code}, ${signal}`);
    });
    spawnedChild.on('error', (err) => console.error(err));
    connectToZeroRPC();
}

function connectToZeroRPC() {

    myConsole.log("Connected to Zero RPC...");
    zerorpcClient = new zerorpc.Client();
    zerorpcClient.connect('tcp://127.0.0.1:4242');


    ipc.on('execCode', (event, val) => {
        myConsole.log(val);
        zerorpcClient.invoke('exec_code', val, (error, res, more) => {
            myConsole.log(res);
            ui.webContents.send('execCode-response', res);
            // myConsole.log(res);
        });
    });

}
