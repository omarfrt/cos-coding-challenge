"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Logger_1 = require("./services/Logger/classes/Logger");
const User_1 = require("./services/User/Class/User");
const DependencyIdentifiers_1 = require("./DependencyIdentifiers");
const AuctionMonitorApp_1 = require("./AuctionMonitorApp");
const CarOnSalesClient_1 = require("./services/CarOnSaleClient/classes/CarOnSalesClient");
/*
 * Create the DI container.
 */
const container = new inversify_1.Container({
    defaultScope: "Singleton",
});
/*
 * Register dependencies in DI environment.
 */
container.bind(DependencyIdentifiers_1.DependencyIdentifier.LOGGER).to(Logger_1.Logger);
container.bind(DependencyIdentifiers_1.DependencyIdentifier.USER).to(User_1.User);
container
    .bind(DependencyIdentifiers_1.DependencyIdentifier.CarOnSaleClient)
    .to(CarOnSalesClient_1.CarOnSaleClient);
/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp_1.AuctionMonitorApp);
/*
 * Start the application
 */
(async () => {
    await app.start();
})();
