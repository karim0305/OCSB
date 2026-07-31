export declare enum ProductStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare class CreateProductDto {
    productName: string;
    productCode: string;
    brand: string;
    category: string;
    description?: string;
    price: number;
    stockQty: number;
    sizes: string[];
    colors: string[];
    status: ProductStatus;
    images: string[];
    isNewArrival: boolean;
    isFeatured: boolean;
    isPublished: boolean;
}
