module.exports = () => {
    const { spawn } = require("child_process");
    return new Promise((resolve, reject) => {
        const child = spawn("feathers", ["--version"], { shell: true });

        child.stdout.on("data", (data) => {
            console.log(`stdout:\n${data}`);
            var regex = /[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}/;
            data = data.toString();
            var _match = data.match(regex);
            if (_match && _match[0]) resolve(_match[0]);
        });

        child.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
            reject(data);
        });

        child.on("error", (error) => {
            console.error(`error: ${error.message}`);
            reject(error);
        });

        child.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
};
