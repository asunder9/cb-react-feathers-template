// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronApp", {
    sayHello: (...args) => ipcRenderer.invoke("say-hello", ...args),
    generateFeathersAppUsingCli: (...args) => ipcRenderer.invoke("generate-feathers-app-using-cli", ...args),
    addFeathersPackageJson: (...args) => ipcRenderer.invoke("add-feathers-package-json", ...args),

    getNvmVersion: (...args) => ipcRenderer.invoke("get-nvm-version", ...args),
    getNodeVersion: (...args) => ipcRenderer.invoke("get-node-version", ...args),
    getFeathersCliVersion: (...args) => ipcRenderer.invoke("get-feathers-cli-version", ...args),

    npmInstall: (...args) => ipcRenderer.invoke("npm-install", ...args),
    writeJsonToFile: (...args) => ipcRenderer.invoke("write-json-to-file", ...args),
    writeTextToFile: (...args) => ipcRenderer.invoke("write-text-to-file", ...args),
});
