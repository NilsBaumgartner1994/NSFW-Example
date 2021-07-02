import {MyExpressRouter, CustomControllers, DefaultControllerHelper} from "nsfw-api";

export default class Weather {

    constructor(logger, models, expressApp, myAccessControl, myExpressRouter,subRoute) {
        this.logger = logger;
        this.models = models;
        this.expressApp = expressApp;
        this.myAccessControl = myAccessControl;
        this.myExpressRouter = myExpressRouter;
        this.subRoute = subRoute;
        this.logger.info("Custom Controller log");
        this.configureRoutes();
    }

    configureRoutes() {
        this.configureExampleRoute();
        this.configureExampleRouteWithPermission();
    }

    configureExampleRoute(){
        let functionToCall = async function(req, res) { //define the index function
            let dataJSON = {"nice":"nice"};
            MyExpressRouter.responseWithSuccessJSON(res,dataJSON);
        }

        let route = this.subRoute+"/public";
        console.log("Register route: "+route);
        this.expressApp.get(route, functionToCall.bind(this)); //register route in express
    }

    configureExampleRouteWithPermission(){
        let functionToCall = async function(req, res) { //define the index function
            let dataJSON = {"secret":"it is still raining"};
            MyExpressRouter.responseWithSuccessJSON(res,dataJSON);
        }

        let route = this.subRoute+"/secret";
        console.log("Register route: "+route);
        let isOwnCallback = false; //callback function to check if permission for all or own
        this.myExpressRouter.withPermissionMiddleware(route, DefaultControllerHelper.CRUD_READ, MyExpressRouter.adminRoutes_accessControlResource, functionToCall, isOwnCallback);
    }

    static register(){
        CustomControllers.registerController("weather", Weather);
    }

}

