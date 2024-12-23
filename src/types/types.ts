interface ProductCharacteristic {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    collection: string;
    name: string;
    karats: string;
    characteristics: ProductCharacteristic[];
    price: string;
    sku: string;
    image: string;
}
