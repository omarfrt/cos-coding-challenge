/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
//interface IAuctionFilter {
//  ids: string[];
//  uuids: string[];
//  externalIds: [];
//  isLive: boolean;
//}

//interface IRunningAuctions {
//  filter: Partial<IAuctionFilter>;
//  count: boolean;
//}

export interface ICarOnSaleClient {
  getRunningAuctions(): Promise<any /* TODO: Introduce a type */>;
  //param: IRunningAuctions
}
