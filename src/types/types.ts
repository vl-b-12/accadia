interface ProductCharacteristic {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  collection: string;
  name: string;
  karats: string;
  characteristics: ProductCharacteristic[];
  price: number;
  sku: string;
  image: string;
}

export interface CartProduct extends Product {
  quantity: number;
  totalPrice: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface NavItem {
  id: number;
  name: string;
  icon: string;
}
