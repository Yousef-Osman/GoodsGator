import { IShoppingCart, ICartItem } from "../interfaces/basket";
import { v4 as uuidv4 } from 'uuid';

export class ShoppingCart implements IShoppingCart {
  id: string = uuidv4();
  items: ICartItem[] = [];
}
