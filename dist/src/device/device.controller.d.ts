import { DeviceTokenService } from './device.service';
import { RegisterDeviceTokenDto } from './dto/create-device.dto';
import { RemoveDeviceTokenDto } from './dto/remove-device-token.dto';
export declare class DeviceTokenController {
    private readonly deviceTokenService;
    constructor(deviceTokenService: DeviceTokenService);
    registerToken(req: any, dto: RegisterDeviceTokenDto): Promise<import("./schema/device.schema").DeviceToken>;
    removeToken(req: any, dto: RemoveDeviceTokenDto): Promise<{
        message: string;
    }>;
    getMyDevices(req: any): Promise<import("./schema/device.schema").DeviceToken[]>;
}
