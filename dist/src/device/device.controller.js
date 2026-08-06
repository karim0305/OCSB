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
exports.DeviceTokenController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const device_service_1 = require("./device.service");
const create_device_dto_1 = require("./dto/create-device.dto");
const remove_device_token_dto_1 = require("./dto/remove-device-token.dto");
let DeviceTokenController = class DeviceTokenController {
    deviceTokenService;
    constructor(deviceTokenService) {
        this.deviceTokenService = deviceTokenService;
    }
    async registerToken(req, dto) {
        const userId = req.user.userId;
        return this.deviceTokenService.registerToken(userId, dto);
    }
    async removeToken(req, dto) {
        const userId = req.user.userId;
        await this.deviceTokenService.removeToken(userId, dto.expoPushToken);
        return { message: 'Device token removed' };
    }
    async getMyDevices(req) {
        const userId = req.user.userId;
        return this.deviceTokenService.getAllForUser(userId);
    }
};
exports.DeviceTokenController = DeviceTokenController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Register or update Expo push token for logged-in user' }),
    (0, swagger_1.ApiBody)({ type: create_device_dto_1.RegisterDeviceTokenDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token registered successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_device_dto_1.RegisterDeviceTokenDto]),
    __metadata("design:returntype", Promise)
], DeviceTokenController.prototype, "registerToken", null);
__decorate([
    (0, common_1.Delete)('remove'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Remove device token (e.g. on logout)' }),
    (0, swagger_1.ApiBody)({ type: remove_device_token_dto_1.RemoveDeviceTokenDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token removed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, remove_device_token_dto_1.RemoveDeviceTokenDto]),
    __metadata("design:returntype", Promise)
], DeviceTokenController.prototype, "removeToken", null);
__decorate([
    (0, common_1.Get)('my-devices'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all registered devices for logged-in user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of device tokens' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeviceTokenController.prototype, "getMyDevices", null);
exports.DeviceTokenController = DeviceTokenController = __decorate([
    (0, swagger_1.ApiTags)('Device Tokens'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('device-tokens'),
    __metadata("design:paramtypes", [device_service_1.DeviceTokenService])
], DeviceTokenController);
//# sourceMappingURL=device.controller.js.map