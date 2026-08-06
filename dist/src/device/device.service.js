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
var DeviceTokenService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceTokenService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const device_schema_1 = require("./schema/device.schema");
let DeviceTokenService = DeviceTokenService_1 = class DeviceTokenService {
    deviceTokenModel;
    logger = new common_1.Logger(DeviceTokenService_1.name);
    constructor(deviceTokenModel) {
        this.deviceTokenModel = deviceTokenModel;
    }
    async registerToken(userId, dto) {
        const token = await this.deviceTokenModel.findOneAndUpdate({ expoPushToken: dto.expoPushToken }, {
            userId: new mongoose_2.Types.ObjectId(userId),
            deviceType: dto.deviceType,
            deviceName: dto.deviceName,
            isActive: true,
            lastUsedAt: new Date(),
        }, { upsert: true, new: true });
        this.logger.log(`Device token registered for user ${userId}`);
        return token;
    }
    async removeToken(userId, expoPushToken) {
        await this.deviceTokenModel.deleteOne({
            userId: new mongoose_2.Types.ObjectId(userId),
            expoPushToken,
        });
    }
    async getActiveTokensByUser(userId) {
        const tokens = await this.deviceTokenModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId), isActive: true })
            .select('expoPushToken')
            .lean();
        return tokens.map((t) => t.expoPushToken);
    }
    async getActiveTokensByUsers(userIds) {
        const objectIds = userIds.map((id) => new mongoose_2.Types.ObjectId(id));
        const tokens = await this.deviceTokenModel
            .find({ userId: { $in: objectIds }, isActive: true })
            .select('expoPushToken')
            .lean();
        return tokens.map((t) => t.expoPushToken);
    }
    async deactivateToken(expoPushToken) {
        await this.deviceTokenModel.updateOne({ expoPushToken }, { isActive: false });
        this.logger.warn(`Deactivated invalid token: ${expoPushToken}`);
    }
    async getAllForUser(userId) {
        return this.deviceTokenModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .sort({ lastUsedAt: -1 })
            .exec();
    }
};
exports.DeviceTokenService = DeviceTokenService;
exports.DeviceTokenService = DeviceTokenService = DeviceTokenService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(device_schema_1.DeviceToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DeviceTokenService);
//# sourceMappingURL=device.service.js.map