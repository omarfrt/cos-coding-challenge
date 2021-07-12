import { inject, injectable } from "inversify";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { IUser } from "services/User/interface/IUser";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
global.fetch = require("node-fetch");
@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  constructor(@inject(DependencyIdentifier.USER) private user: IUser) {}

  async getRunningAuctions() {
    const info = await this.user.login("salesman@random.com", "123test");
    console.log(info);

    const { userId, token } = info;
    if (!userId || !token) {
      console.log("naah bruh");
      return;
    }
    const response = await fetch(
      "https://api-core-dev.caronsale.de/api/v2/auction/buyer/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userId,
          authToken: token,
        },
      }
    );
    const parsedResponse = await response.json();
    console.log(parsedResponse);

    return parsedResponse;
  }
}
