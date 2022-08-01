import feathers from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";

import auth from "@feathersjs/authentication-client";
import axios from "axios";
import { serverUrl } from "../assets/cb_config.json";
const app = feathers();
const restClient = rest(serverUrl);

// Setup the transport (Rest, Socket, etc.) here
app.configure(restClient.axios(axios));

// Available options are listed in the "Options" section
app.configure(
    auth({
        storage: window.localStorage,
    })
);

console.log("Rest client configured");
export default app;
