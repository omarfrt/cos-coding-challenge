/**
 * This service describes an interface to access auction data from the User API.
 */
type userType = 1 | 2 | 3 | 4 | 5;
type userRole =
  | "buyers"
  | "sellers"
  | "sellersSupervisors"
  | "internalUsers"
  | "sysadmins"
  | "transportationProviders"
  | "cargoCustomers"
  | "clientApplication";

export interface IAuthenticationResult {
  authenticated: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUID: string;
  token: string;
  type: userType;
  privileges: string;
  userRole: userRole;
}

export interface IUser {
  info: Partial<IAuthenticationResult>;
  login(userMailId: string, password: string): Promise<IAuthenticationResult>;
}
