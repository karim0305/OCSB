export declare enum NotificationType {
    ORDER = "order",
    PROMO = "promo",
    GENERAL = "general",
    USER = "user"
}
export declare class CreateNotificationDto {
    userId: string;
    title: string;
    body: string;
    type: NotificationType;
    data?: Record<string, any>;
}
