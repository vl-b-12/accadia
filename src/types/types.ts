export interface Product {
  id: number;
  collection: string;
  description: string;
  goldWeight: number;
  image: string;
  jewelryType: string;
  name: string;
  price: number;
  sku: string;
  descriptionData: string[];
  //TODO update later karats value
  karats: string;
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
  dataKey?: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  state: string;
  dob: string;
  fullName: string;
  hasPayments: boolean;
}

export interface Filters {
  page?: number;
  sku?: string;
  code?: string;
  collection?: string;
  name?: string;
  jewelryType?: string;
}

export type PaymentType = "full" | "split";
