import "regenerator-runtime/runtime.js";
import 'react-app-polyfill/ie9';

import React from 'react';
import ReactDOM from 'react-dom';

import {ServerWeb, AppMenu, AppMenuItem} from "nsfw-web";
import DefaultComponent from "./DefaultComponent";
import TestComponent from "./TestComponent";

const regeneratorRuntime = require("regenerator-runtime");

const config = {
    "title": "NSFW-Dev",
    "titleLong": "NSFW-Dev",
    "githubLink": "https://github.com/NilsBaumgartner1994/GEG",
    "version": "1.0.0",
    "preferedAuthMethod": "myUOS"
}

ServerWeb.setConfig(config);
AppMenu.hideAllDefaultMenuContent();
let customMenu = new AppMenuItem("MyCustomMenu", DefaultComponent);
customMenu.addChildren(new AppMenuItem("DefaultTest", DefaultComponent));
customMenu.addChildren(new AppMenuItem("TestComponentTest", TestComponent));
customMenu.addChildren(new AppMenuItem("ExternalLinkTest").setExternLink("https://github.com/"));
AppMenu.addMenuWithRoutes(customMenu);

AppMenu.addRouteWithoutMenu("/hiddenRoute", DefaultComponent);

ServerWeb.start(ReactDOM);
