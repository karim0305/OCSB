export declare enum PaymentMethod {
    COD = "cod",
    CARD = "card",
    EASYPAISA = "easypaisa",
    JAZZCASH = "jazzcash",
    BANK_TRANSFER = "bank_transfer"
}
export declare class CreateOrderDto {
    userId: string;
    items: any[];
    totalAmount: number;
    paymentMethod: PaymentMethod;
    shippingAddress: object;
    orderStatus: string;
    paymentStatus: string;
}
