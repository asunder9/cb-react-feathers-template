module.exports = (rootPath, filename, data) => {
    const thisScriptFileName = __filename.slice(__dirname.length + 1); // gives <filename.js>
    const { existsSync, writeFile } = require("fs");
    const path = require("path");
    return new Promise((resolve, reject) => {
        if (!existsSync(rootPath)) reject(`Folder with path:[${rootPath}] does not exist`);

        const pkgJsonFullPath = path.join(rootPath, filename);

        try {
            var jsonContent = JSON.stringify(data);
            writeFile(pkgJsonFullPath, jsonContent);
            resolve(true);
        } catch (error) {
            console.log(`Failed to write [${filename}] file. [${thisScriptFileName}]`, error);
            reject(error);
        }
    });
};
