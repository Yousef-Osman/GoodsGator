export interface IBasket {
  id: string;
  items: BasketItem[];
}

export interface BasketItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
  brand: string;
}
