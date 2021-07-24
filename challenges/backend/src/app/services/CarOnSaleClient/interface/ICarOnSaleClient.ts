export interface ICarOnSaleClient {
  getRunningAuctions(): Promise<string>;

  mappedResponse(mappedResponse: any): Promise<String>;
}
