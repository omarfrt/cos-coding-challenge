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
exports.CarOnSaleClient = void 0;
const inversify_1 = require("inversify");
const DependencyIdentifiers_1 = require("../../../DependencyIdentifiers");
global.fetch = require("node-fetch");
let CarOnSaleClient = class CarOnSaleClient {
    constructor(user) {
        this.user = user;
    }
    async getRunningAuctions() {
        const { userId, token } = this.user.info;
        if (!userId || !token) {
            console.log("naah bruh");
            return;
        }
        return await fetch("https://api-core-dev.caronsale.de/api/v2/auction/buyer", {
            method: "GET",
            headers: {
                userId,
                authToken: token,
            },
        }).then((response) => response.json());
    }
};
CarOnSaleClient = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(DependencyIdentifiers_1.DependencyIdentifier.USER)),
    __metadata("design:paramtypes", [Object])
], CarOnSaleClient);
exports.CarOnSaleClient = CarOnSaleClient;
