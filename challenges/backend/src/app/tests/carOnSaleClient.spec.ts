import "reflect-metadata";
const chai = require("chai");
const expect = chai.expect;
//const sinon = require("sinon");
const data = require("./data.json");
import * as returned from "./mappedItems";
import { Logger } from "../services/Logger/classes/Logger";
const logger = new Logger();
import { User } from "../services/User/Class/User";
const user = new User();
import { CarOnSaleClient } from "../services/CarOnSaleClient/classes/CarOnSalesClient";
const Auctions = new CarOnSaleClient(user, logger);

describe("CarOnSale Client", function () {
  it("should return auction percentage + count num of running auctions", async function () {
    expect(await Auctions.mappedResponse(data)).to.equal(
      returned.default.AuctionsNum
    );
  });
});
