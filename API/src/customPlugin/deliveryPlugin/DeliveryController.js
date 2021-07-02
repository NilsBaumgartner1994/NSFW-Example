import {MyExpressRouter, DefaultControllerHelper} from "nsfw-api";

export default class DeliveryController {

    constructor(logger, models, myExpressRouter, route) {
        this.logger = logger;
        this.models = models;
        this.expressApp = myExpressRouter.expressApp;
        this.myAccessControl = myExpressRouter.myAccessControl;
        this.myExpressRouter = myExpressRouter;
        this.route = route;
        this.logger.info("Custom Delivery Controller");
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

        let route = this.route+"/public";
        console.log("Register route: "+route);
        this.expressApp.get(route, functionToCall.bind(this)); //register route in express
    }

    configureExampleRouteWithPermission(){
        let functionToCall = async function(req, res) { //define the index function
            let dataJSON = {"secret":"it is still raining"};
            MyExpressRouter.responseWithSuccessJSON(res,dataJSON);
        }

        let route = this.route+"/secret";
        console.log("Register route: "+route);
        let isOwnCallback = false; //callback function to check if permission for all or own
        this.myExpressRouter.withPermissionMiddleware(route, DefaultControllerHelper.CRUD_READ, MyExpressRouter.adminRoutes_accessControlResource, functionToCall, isOwnCallback);
    }

}

