import { Container } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { Logger } from "./services/Logger/classes/Logger";
import { User } from "./services/User/Class/User";
import { IUser } from "./services/User/interface/IUser";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSalesClient";

/*
 * Create the DI container.
 */
const container = new Container({
  defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IUser>(DependencyIdentifier.USER).to(User);
container
  .bind<ICarOnSaleClient>(DependencyIdentifier.CarOnSaleClient)
  .to(CarOnSaleClient);
/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
  await app.start();
})();
