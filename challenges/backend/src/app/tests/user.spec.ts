// var assert = require("assert");
// import fetchMock from "fetch-mock";

// import * as endpoints from "../endpoints";
// import { User } from "../services/User/Class/User";

// describe("When the user login", function () {
//   it("should save the auth state", async function () {
//     /**
//      * Mock Endpoints -> {token,...}
//      * Assert response === {}
//      * Asset user.info === {}
//      *
//      * response === error
//      * info undefined
//      */
//     // Credentiels
//     const email = "sdfds@sdf";
//     const password = "234234";

//     // Mocking
//     const mockedResponse = { token: "234", userId: "sdfsdf" };
//     fetchMock(`${endpoints.AUTHENTICATE}/${email}`, mockedResponse);

//     const user = new User();
//     const response = await user.login(email, password);
//     assert.equal(response, mockedResponse);
//   });
// });
