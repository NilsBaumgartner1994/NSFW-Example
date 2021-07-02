import DeliverySchedule from "./DeliverySchedule";
import DeliveryController from "./DeliveryController";

export default class DeliveryPlugin {

    constructor() {
    }

    /**
     * The Master thread activates this
     */
    activateMasterPlugin(logger, models, schedule, redisClient, serverConfig, sequelizeConfig){
        this.deliverySchedule = new DeliverySchedule(logger, schedule, models);
    }

    /**
     * Each worker
     */
    activateWorkerPlugin(logger, models, schedule, redisClient, serverConfig, sequelizeConfig, myExpressRouter, route){
        this.deliveryController = new DeliveryController(logger, models, myExpressRouter, route);
    }

}
