import { injectable } from "inversify";
const fetch = require("node-fetch");
import * as Endpoints from "../../../endpoints";
import { IUser, IAuthenticationResult } from "../interface/IUser";

@injectable()
export class User implements IUser {
  public constructor() {}

  info: Partial<IAuthenticationResult> = {};

  public async login(
    userMailId: string,
    password: string
  ): Promise<IAuthenticationResult> {
    const response = await fetch(`${Endpoints.AUTHENTICATE}/${userMailId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    });
    const parsedResponse = await response.json();
    this.info = parsedResponse;

    return parsedResponse;
  }
}
