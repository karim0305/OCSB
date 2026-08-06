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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDeviceTokenDto = exports.DeviceType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var DeviceType;
(function (DeviceType) {
    DeviceType["IOS"] = "ios";
    DeviceType["ANDROID"] = "android";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
class RegisterDeviceTokenDto {
    expoPushToken;
    deviceType;
    deviceName;
}
exports.RegisterDeviceTokenDto = RegisterDeviceTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Expo push notification token',
        example: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDeviceTokenDto.prototype, "expoPushToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Device platform',
        enum: DeviceType,
        example: DeviceType.ANDROID,
    }),
    (0, class_validator_1.IsEnum)(DeviceType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDeviceTokenDto.prototype, "deviceType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Device model/name for identification',
        example: 'Samsung Galaxy S23',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDeviceTokenDto.prototype, "deviceName", void 0);
//# sourceMappingURL=create-device.dto.js.map