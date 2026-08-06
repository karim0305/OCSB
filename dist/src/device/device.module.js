"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceTokenModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const device_schema_1 = require("./schema/device.schema");
const device_service_1 = require("./device.service");
const device_controller_1 = require("./device.controller");
let DeviceTokenModule = class DeviceTokenModule {
};
exports.DeviceTokenModule = DeviceTokenModule;
exports.DeviceTokenModule = DeviceTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: device_schema_1.DeviceToken.name, schema: device_schema_1.DeviceTokenSchema },
            ]),
        ],
        controllers: [device_controller_1.DeviceTokenController],
        providers: [device_service_1.DeviceTokenService],
        exports: [device_service_1.DeviceTokenService],
    })
], DeviceTokenModule);
//# sourceMappingURL=device.module.js.map