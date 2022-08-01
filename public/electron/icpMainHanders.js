const { ipcMain } = require("electron");

module.exports = () => {
    ipcMain.handle("say-hello", (event, ...args) => {
        console.log("args", ...args);
        return "electorn.js here";
    });

    // ++++++++++ Feathers ++++++++++
    ipcMain.handle("generate-feathers-app-using-cli", (event, ...args) => {
        const generateFeathersAppUsingCli = require("./cbServices/feathers/generateFeathersAppUsingCli");
        return generateFeathersAppUsingCli(...args);
    });

    ipcMain.handle("add-feathers-package-json", (event, ...args) => {
        const addFeathersPackageJson = require("./cbServices/addFeathersPackageJson");
        return addFeathersPackageJson(path, ...args);
    });

    ipcMain.handle("get-nvm-version", (event, ...args) => {
        const getNvmVersion = require("./cbServices/getNvmVersion");
        return getNvmVersion(...args);
    });

    ipcMain.handle("get-node-version", (event, ...args) => {
        const getNodeVersion = require("./cbServices/getNodeVersion");
        return getNodeVersion(...args);
    });

    ipcMain.handle("get-feathers-cli-version", (event, ...args) => {
        const getFeathersCliVersion = require("./cbServices/getFeathersCliVersion");
        return getFeathersCliVersion(...args);
    });

    ipcMain.handle("npm-install", (event, ...args) => {
        const npmInstall = require("./cbServices/npmInstall");
        return npmInstall(...args);
    });
    ipcMain.handle("write-json-to-file", (event, ...args) => {
        const writeJsonToFile = require("./cbServices/writeJsonToFile");
        return writeJsonToFile(...args);
    });
    ipcMain.handle("write-text-to-file", (event, ...args) => {
        const writeTextToFile = require("./cbServices/writeTextToFile");
        return writeTextToFile(...args);
    });
};
