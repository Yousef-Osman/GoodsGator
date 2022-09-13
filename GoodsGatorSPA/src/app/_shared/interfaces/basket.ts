export interface IShoppingCart {
  id: string;
  items: ICartItem[];
}

export interface ICartItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
  brand: string;
}

export interface ICartSummary {
  shipping: number;
  subTotal: number;
  total: number;
}