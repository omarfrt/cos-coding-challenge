import { inject, injectable } from "inversify";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { IUser } from "services/User/interface/IUser";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "services/Logger/interface/ILogger";
const querystring = require("querystring");
global.fetch = require("node-fetch");
@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  constructor(
    @inject(DependencyIdentifier.USER) private user: IUser,
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger
  ) {}

  async getRunningAuctions() {
    const info = await this.user.login("salesman@random.com", "123test");

    const { userId, token } = info;
    if (!userId || !token) {
      console.log("no useable token found ");
      return;
    }
    const endpoint = "https://api-core-dev.caronsale.de/api/v2/auction/buyer/";
    const params = {
      count: false,
    };
    const queryString = querystring.stringify(params);
    const response = await fetch(`${endpoint}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userId,
        authToken: token,
      },
    });
    const parsedResponse = await response.json();
    return await this.mappedResponse(parsedResponse);
  }

  async mappedResponse(parsedResponse: any) {
    const count = parsedResponse.total;
    const items = parsedResponse.items;
    // avrage percentage of the auction progress (ratio of current highest bid value and minimum required ask)
    // AuctionProgressPercentage: ((currentHighestBidValue / minimumRequiredAsk ) * 100 ).tofix(3)
    const mappedItems = await items.map((item: any) => ({
      AvrageNumBets: (
        (item.currentHighestBidValue / item.minimumRequiredAsk) *
        100
      ).toFixed(1),
    }));
    // avragenumBets needs to be mapped to be a string and get read by the logger
    //not as pretty as the json format but readable i guess
    const AvrageNumBets = await mappedItems.map((mappedItems: any) => {
      return mappedItems["AvrageNumBets"];
    });
    const res = `number of running auctions is : ${count} the Avrage number of bets : ${AvrageNumBets}`;
    this.logger.log(res);
    return res;
  }
}
