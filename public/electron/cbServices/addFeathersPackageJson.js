module.exports = (path, packageJsonObject) => {
    const { existsSync, writeFile } = require("fs");
    const path = require("path");
    return new Promise((resolve, reject) => {
        if (!existsSync(path)) reject(`Folder with path:[${path}] does not exist`);

        const pkgJsonFullPath = path.join(path, "package.json");

        if (!existsSync(pkgJsonFullPath)) reject(`File 'package.json' with path:[${path}] does not exist`);

        try {
            var jsonContent = JSON.stringify(packageJsonObject);
            writeFile(pkgJsonFullPath, jsonContent);
            resolve(true);
        } catch (error) {
            console.log(`Failed to write 'package.json' file. [addFeathersPackageJson.js]`, error);
            reject(error);
        }
    });
};
