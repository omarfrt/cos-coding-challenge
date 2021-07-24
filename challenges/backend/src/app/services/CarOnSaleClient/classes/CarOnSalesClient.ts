import { inject, injectable } from "inversify";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { IUser } from "services/User/interface/IUser";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "services/Logger/interface/ILogger";
import * as Endpoints from "../../../endpoints";
const querystring = require("querystring");
const fetch = require("node-fetch");
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
      const Err = "no useable token found ";
      console.log(Err);

      return Err;
    }
    const params = {
      count: false,
    };
    const queryString = querystring.stringify(params);
    const response = await fetch(`${Endpoints.AuctionBuyer}?${queryString}`, {
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
    const AllAuctionProgress = await items.map((item: any) =>
      ((item.currentHighestBidValue / item.minimumRequiredAsk) * 100).toFixed(1)
    );
    // reduce the respose array of auction object to get the wanted response format
    const AuctionProgress = AllAuctionProgress.reduce(
      (acc: number, item: any, i: any) =>
        `${acc} 
        Auction number ${i}:  the Avrage number of bids : ${items[i].numBids}  the average percentage of the auction progress ${item}% `,
      ""
    );

    const res = `the number of running auctions is : ${count} 
    ${AuctionProgress}`;
    this.logger.log(res);
    return res;
  }
}
