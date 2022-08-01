const pathDir = "E:\\ProjectDevelopmentStage\\NodeJS\\feathersjs-example";
const fileName = "p";

const { spawn, exec } = require("child_process");
const path = require("path");

const outputInstruction = (msg, ls, sec = 200) => {
    //   console.log("outputInstruction", msg, sec);
    setTimeout(() => {
        ls.stdin.write(msg);
    }, sec);
};

const jConfigTest = {
    Mocha: "1",
    Jest: "2",
};

const jConfigApi = {
    REST: "1",
    RealtimeSocketIo: "2",
    RealtimePrimus: "3",
};

const jConfigDb = {
    custom: "1",
    InMemory: "2",
    NeDB: "3",
    MongoDB: "4",
    Mongoose: "5",
    Sequelize: "6",
    KnexJS: "7",
    Objection: "8",
    Cassandra: "9",
};

const jConfigScript = {
    JavaScript: "1",
    TypeScript: "2",
};

const jConfigPkg = {
    npm: "1",
    yarn: "2",
};

const jConfigCoding = {
    ESLint: "1",
    StandardJS: "2",
};

const jConfigAuth = {
    UsernamePassword: "1",
    Auth0: "2",
    Google: "3",
    Facebook: "4",
    Twitter: "5",
    GitHub: "6",
};

const defaultConfig = {
    scriptType: "JavaScript", // TypeScript
    descType: "", // string
    pkgType: "npm", // yarn
    ifAuth: "y", // y
    codingType: "ESLint", // StandardJS

    testType: "Mocha",
    authType: ["UsernamePassword"],
    serviceName: "users",

    dbType: "NeDB",
    dbConnection: "default",

    apiType: ["REST", "RealtimeSocketIo"],
};

// authentication strategies
// (entity) service?

fn_createApp2 = (pathToMake, appName, feathersConfig) => {
    feathersConfig = { ...defaultConfig, ...feathersConfig };
    const fullPath = path.join(pathToMake, appName);
    //   console.log(fullPath);
    isJavaEntered = 0;
    isDescriptionEntered = 0;
    isProjectEntered = 0;
    isNpmEntered = 0;
    desName = "okGood";
    isDesNameEntered = 0;
    isSourceFileEntered = 0;
    isRestEntered = 0;
    isMochaEntered = 0;
    isAuthEntered = 0;
    iscodingStyleEntered = 0;
    isAuthTypeEntered = 0;
    isKindServiceEntered = 0;
    isdbConnectionEntered = 0;
    isEntityEntered = 0;

    return new Promise((resolve, reject) => {
        const ls = spawn("cmd.exe", ["/c", "feathers", "generate", "app"], { cwd: fullPath });

        var resetTime = setTimeout(
            (ls) => {
                reject("timeout request error 1");
                ls.kill("SIGINT");
            },
            1200000,
            ls
        );

        ls.stdout.on("data", (data) => {
            //   console.log(`stdout: ${data}`);
            clearTimeout(resetTime);
            resetTime = setTimeout(
                (ls) => {
                    reject("timeout request error 2");
                    ls.kill("SIGINT");
                },
                1200000,
                ls
            );

            if (data.includes("JavaScript")) {
                if (isJavaEntered == 0) {
                    outputInstruction(jConfigScript[feathersConfig.scriptType] || "1", ls);
                    //   console.log("jConfigScript[feathersConfig.scriptType]", jConfigScript[feathersConfig.scriptType]);
                } else if (isJavaEntered == 1) {
                    outputInstruction("\n", ls);
                    clearTimeout(resetTime);
                }
                isJavaEntered++;
            } else if (data.includes("Project name")) {
                if (isProjectEntered == 0) {
                    outputInstruction("\n", ls);
                    clearTimeout(resetTime);
                } else if (isProjectEntered == 1) {
                }
                isProjectEntered++;
            } else if (data.includes("Description")) {
                if (isDescriptionEntered == 0) {
                    outputInstruction(feathersConfig.descType || " ", ls);
                    //   console.log("[feathersConfig.descType]", feathersConfig.descType);
                } else if (isDescriptionEntered == 1) {
                    outputInstruction("\n", ls, 500);
                }
                isDescriptionEntered++;
            } else if (data.includes("npm")) {
                if (isNpmEntered == 0) {
                    outputInstruction(jConfigPkg[feathersConfig.pkgType] || "1", ls);
                    //   console.log("jConfigPkg[feathersConfig.pkgType]", jConfigPkg[feathersConfig.pkgType]);
                } // select 1st selection
                else if (isNpmEntered == 1) {
                    outputInstruction("\n", ls);
                    clearTimeout(resetTime);
                }
                isNpmEntered++;
            } else if (data.includes("source files live in")) {
                if (isSourceFileEntered == 0) {
                    outputInstruction("\n", ls);
                    clearTimeout(resetTime);
                }
                isSourceFileEntered++;
            } else if (data.includes("REST")) {
                const arrayRest = feathersConfig.apiType;
                const rest_lastValue = arrayRest.length === 0 ? 1 : arrayRest.length;

                if (isRestEntered == 0) {
                    outputInstruction("a", ls);
                } else if (isRestEntered == 1) {
                    outputInstruction("a", ls);
                } else if (isRestEntered == 2 && arrayRest.length === 0) {
                    outputInstruction("1", ls);
                } else if (isRestEntered == 2 && arrayRest.length > 0) {
                    outputInstruction(jConfigApi[arrayRest[0]], ls);
                } else if (isRestEntered == 3 && arrayRest.length > 1) {
                    outputInstruction(jConfigApi[arrayRest[1]], ls);
                } else if (isRestEntered == 4 && arrayRest.length > 2) {
                    outputInstruction(jConfigApi[arrayRest[2]], ls);
                } else if (isRestEntered == 2 + rest_lastValue) {
                    outputInstruction("\n", ls);
                    clearTimeout(resetTime);
                }
                // can be done in for loop to make the ifelse more automated
                isRestEntered++;
            } else if (data.includes("assert")) {
                if (isMochaEntered == 0) {
                    outputInstruction(jConfigTest[feathersConfig.testType] || "1", ls);
                    //   console.log("jConfigTest[feathersConfig.testType]", jConfigTest[feathersConfig.testType]);
                } // select 1st selection
                else if (isMochaEntered == 1) {
                    outputInstruction("\n", ls);
                    clearTimeout(resetTime);
                }
                // console.log(isMochaEntered);
                isMochaEntered++;
            } else if (data.includes("uses authentication")) {
                if (isAuthEntered == 0) {
                    outputInstruction(feathersConfig.ifAuth, ls);
                } else if (isAuthEntered == 1) {
                    outputInstruction("\n", ls);
                    clearTimeout(resetTime);
                }

                // console.log(feathersConfig.ifAuth);
                isAuthEntered++;
            } else if (data.includes("authentication strategies")) {
                const arrayAuth = feathersConfig.authType;
                const auth_lastValue = arrayAuth.length == 0 ? 1 : arrayAuth.length;
                // console.log({ isAuthTypeEntered });
                if (isAuthTypeEntered == 0) {
                    outputInstruction("a", ls);
                } // set all selection
                else if (isAuthTypeEntered == 1) {
                    outputInstruction("a", ls);
                } // clear all selection jConfigAuth
                else if (isAuthTypeEntered == 2 && arrayAuth.length == 0) {
                    outputInstruction("1", ls);
                } else if (isAuthTypeEntered == 2 && arrayAuth.length > 0) {
                    outputInstruction(jConfigAuth[arrayAuth[0]], ls);
                } else if (isAuthTypeEntered == 3 && arrayAuth.length > 1) {
                    outputInstruction(jConfigAuth[arrayAuth[1]], ls);
                } else if (isAuthTypeEntered == 4 && arrayAuth.length > 2) {
                    outputInstruction(jConfigAuth[arrayAuth[2]], ls);
                } else if (isAuthTypeEntered == 5 && arrayAuth.length > 3) {
                    outputInstruction(jConfigAuth[arrayAuth[3]], ls);
                } else if (isAuthTypeEntered == 6 && arrayAuth.length > 4) {
                    outputInstruction(jConfigAuth[arrayAuth[4]], ls);
                } else if (isAuthTypeEntered == 7 && arrayAuth.length > 5) {
                    outputInstruction(jConfigAuth[arrayAuth[5]], ls);
                } else if (isAuthTypeEntered == 2 + auth_lastValue) {
                    outputInstruction("\n", ls);
                    clearTimeout(resetTime);
                }

                isAuthTypeEntered++;
            } else if (data.includes("(entity) service")) {
                if (isEntityEntered == 0) {
                    outputInstruction(feathersConfig.serviceName, ls);
                } else if (isEntityEntered == 1) {
                    outputInstruction("\n", ls, 500);
                }
                isEntityEntered++;
            } else if (data.includes("kind of service")) {
                if (isKindServiceEntered == 0) {
                    outputInstruction(jConfigDb[feathersConfig.dbType] || "2", ls);
                } else if (isKindServiceEntered == 1) {
                    outputInstruction("\n", ls);
                    clearTimeout(resetTime);
                }
                // console.log("jConfigDb[feathersConfig.dbType]", jConfigDb[feathersConfig.dbType]);
                isKindServiceEntered++;
            } else if (data.includes("database connection")) {
                outputInstruction("\n", ls);
                // if(isdbConnectionEntered==0){outputInstruction(jConfigDb[feathersConfig.dbType]||"2",ls);}
                // else if(isdbConnectionEntered==1){outputInstruction("\n",ls);}
                // console.log("jConfigDb[feathersConfig.dbType]",jConfigDb[feathersConfig.dbType])
                isdbConnectionEntered++;
            } else if (data.includes("coding style")) {
                if (iscodingStyleEntered == 0) {
                    outputInstruction("2", ls);
                } // select 2nd selection
                else if (iscodingStyleEntered == 1) {
                    outputInstruction("\n", ls);
                    clearTimeout(resetTime);
                }
                // console.log(iscodingStyleEntered);
                iscodingStyleEntered++;
            }
        });

        ls.stderr.on("data", (data) => {
            //   console.error(`stderr: ${data}`);
            clearTimeout(resetTime);
        });

        ls.on("close", (code) => {
            //   console.log(`************************child process exited with code ${code}`);
            resolve({ result: "success", message: "project created" });
        });
    });
};

function clearAndKill(resetTime, ls, sec) {
    clearTimeout(resetTime);
    resetTime = setTimeout(
        (ls) => {
            reject("timeout request error 3");
            ls.kill("SIGINT");
        },
        sec,
        ls
    );
    return resetTime;
}

module.exports = (pathToMake, appName, feathersConfig) => {
    const fs = require("fs");
    const path = require("path");

    const dirname = path.join(pathToMake, appName);

    return new Promise((resolve, reject) => {
        if (fs.existsSync(dirname)) {
            console.log("project folder already exist, please delete it or choose a different project name");
            reject("project folder already exist, please delete it or choose a different project name");
        }

        fs.mkdir(
            path.join(pathToMake, appName), // __dirname
            { recursive: true },
            (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                console.log("Directory created successfully!");
                fn_createApp2(pathToMake, appName, feathersConfig)
                    .then((data) => resolve(data))
                    .catch((err) => reject(err));
            }
        );
    });
};

// fn_createApp2(pathDir, 'pop4', feathersConfig)
// fn_MakeFileDir2(pathDir, "pop4", feathersConfig)
//   .then((data) => console.log({ data }))
//   .catch((error) => console.log({ error }));
