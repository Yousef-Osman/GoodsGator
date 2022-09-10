import { BasketItem, IBasket } from "../interfaces/basket";
import { v4 as uuidv4 } from 'uuid';

export class Basket implements IBasket {
  id: string = uuidv4();
  items: BasketItem[] = [];
}
