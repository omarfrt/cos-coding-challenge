import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
//import { IUser } from "services/User/interface/IUser";
import "reflect-metadata";
import { ICarOnSaleClient } from "services/CarOnSaleClient/interface/ICarOnSaleClient";

@injectable()
export class AuctionMonitorApp {
  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    // @inject(DependencyIdentifier.USER) private user: IUser,
    @inject(DependencyIdentifier.CarOnSaleClient)
    private CarOnSale: ICarOnSaleClient
  ) {}

  public async start(): Promise<void> {
    this.logger.log(`Auction Monitor started.`);
    //this.user.login("salesman@random.com", "123test");
    this.CarOnSale.getRunningAuctions();

    // TODO: Retrieve auctions and display aggregated information (see README.md)
  }
}
