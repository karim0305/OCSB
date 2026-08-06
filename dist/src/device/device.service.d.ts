import { Model } from 'mongoose';
import { DeviceToken, DeviceTokenDocument } from './schema/device.schema';
import { RegisterDeviceTokenDto } from './dto/create-device.dto';
export declare class DeviceTokenService {
    private readonly deviceTokenModel;
    private readonly logger;
    constructor(deviceTokenModel: Model<DeviceTokenDocument>);
    registerToken(userId: string, dto: RegisterDeviceTokenDto): Promise<DeviceToken>;
    removeToken(userId: string, expoPushToken: string): Promise<void>;
    getActiveTokensByUser(userId: string): Promise<string[]>;
    getActiveTokensByUsers(userIds: string[]): Promise<string[]>;
    deactivateToken(expoPushToken: string): Promise<void>;
    getAllForUser(userId: string): Promise<DeviceToken[]>;
}
