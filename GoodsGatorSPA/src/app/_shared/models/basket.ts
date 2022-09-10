import { BasketItem, IBasket } from "../interfaces/basket";
import { uuid } from 'uuidv4';

export class Basket implements IBasket {
  id: string = uuid();
  items: BasketItem[] = [];
}
