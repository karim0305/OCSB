export declare class CreateProductDto {
    productName: string;
    brand: string;
    category: string;
    description?: string;
    price: number;
    stockQty: number;
    sizes: string[];
    colors: string[];
    images: string[];
    isNewArrival: boolean;
    isFeatured: boolean;
    isPublished: boolean;
}
