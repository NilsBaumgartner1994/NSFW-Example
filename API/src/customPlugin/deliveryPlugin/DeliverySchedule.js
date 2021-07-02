import {ScheduleModule} from "nsfw-api";

export default class DeliverySchedule {

    static deliveryConfig = {
            "second": "*/30", //alle 30 Sekunden
            "minute": "*",
            "hour": "*",
            "day of month": "*",
            "month": "*",
            "day of week": "*",
    };

    constructor(logger, schedule, models) {
        this.models = models;
        this.logger = logger;
        this.schedule = schedule;
        this.logger.info("Custom Delivery Schedule initialization");
        this.initializeSchedule();
    }

    /**
     * Method to prepare everything for the shedule
     * @returns {Promise<void>}
     */
    async initializeSchedule() {
        this.initializeDeliverySchedule();
    }

    /**
     * Initialize the machine shedule
     * @returns {Promise<void>}
     */
    async initializeDeliverySchedule() {
        const instance = this;
        const scheduleTime = ScheduleModule.jsonToScheduleString(DeliverySchedule.deliveryConfig);
        let job = this.schedule.scheduleJob(scheduleTime, async function () {
            instance.logger.info("[DeliverySchedule] checking for things");
            let allItems = await instance.models.Item.findAll();
            console.log("There are "+allItems.length+" Items in total");
        });
        this.job = job;
    }

}

