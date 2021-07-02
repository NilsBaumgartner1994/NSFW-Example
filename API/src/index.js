/* eslint no-console: "off" */

import Items from "./resourceHooks/Items";

const config = require("./../config/config.json");
import {ServerAPI, AuthConnector} from "nsfw-api";
import {AuthStudIP} from "nsfw-auth-studip";
import DeliveryPlugin from "./customPlugin/deliveryPlugin/DeliveryPlugin";
import Weather from "./customControllers/Weather";

const path = require('path');
const fs = require("fs"); //file-system

async function main(){
    let ownPath = fs.realpathSync('.');
    let pathToModels = path.join(ownPath, "models");

    let amountOfThreads = 1; // set to "auto" to enable multi threading
    let server = new ServerAPI(config["server"], config["production"], pathToModels, amountOfThreads);

    /**
     * Customization start
     */
    Items.register(); // customize the default controller
    Weather.register(); // add a custom controller
    server.registerPlugin("DeliveryPlugin", new DeliveryPlugin()); //go further to register your plugin
    /**
     * Customization end
     */

    // Set permission roles
    AuthStudIP.setRoleMapping("admin","user","user");
    AuthConnector.registerAuthMethod(AuthStudIP);


    server.start();
}

main();
