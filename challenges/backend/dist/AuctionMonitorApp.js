"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionMonitorApp = void 0;
const inversify_1 = require("inversify");
const DependencyIdentifiers_1 = require("./DependencyIdentifiers");
require("reflect-metadata");
let AuctionMonitorApp = class AuctionMonitorApp {
    constructor(logger, user, CarOnSale) {
        this.logger = logger;
        this.user = user;
        this.CarOnSale = CarOnSale;
    }
    async start() {
        this.logger.log(`Auction Monitor started.`);
        this.user.login("salesman@random.com", "123test");
        this.CarOnSale.getRunningAuctions();
        // TODO: Retrieve auctions and display aggregated information (see README.md)
    }
};
AuctionMonitorApp = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(DependencyIdentifiers_1.DependencyIdentifier.LOGGER)),
    __param(1, inversify_1.inject(DependencyIdentifiers_1.DependencyIdentifier.USER)),
    __param(2, inversify_1.inject(DependencyIdentifiers_1.DependencyIdentifier.CarOnSaleClient)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuctionMonitorApp);
exports.AuctionMonitorApp = AuctionMonitorApp;
