import "reflect-metadata";
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
import { User } from "../services/User/Class/User";
const user = new User();
describe("User Login Method", function () {
  it("should be called with the correct MailId and Password", function () {
    var spy = sinon.spy(user, "login");
    const userMailId = "salesman@random.com";
    const password = "123test";
    user.login("salesman@random.com", "123test");
    expect(spy.calledWith(userMailId, password)).to.be.true;
  });
});
