export declare enum DeviceType {
    IOS = "ios",
    ANDROID = "android"
}
export declare class RegisterDeviceTokenDto {
    expoPushToken: string;
    deviceType: DeviceType;
    deviceName?: string;
}
