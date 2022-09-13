import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICartItem, IShoppingCart, ICartSummary } from '../_shared/interfaces/basket';
import { Product } from '../_shared/interfaces/product';
import { ShoppingCart } from '../_shared/models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl: string = environment.apiUrl;
  private shoppingCart = new BehaviorSubject<IShoppingCart>(null);
  cart$ = this.shoppingCart.asObservable();
  private cartSummarySource = new BehaviorSubject<ICartSummary>(null);
  cartSummary$ = this.cartSummarySource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IShoppingCart) => {
        this.shoppingCart.next(basket);
        this.getCatTotal();
      })
    )
  }

  setBasket(basket: IShoppingCart) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe({
      next: (basket: IShoppingCart) => {
        this.shoppingCart.next(basket);
        this.getCatTotal();
      },
      error: e => console.log(e)
    });
  }

  getCurrentBasketValue() {
    return this.shoppingCart.value;
  }

  getCatTotal() {
    const shipping = 50;
    const items = this.getCurrentBasketValue().items;
    const subTotal = items.reduce((result, item) => (item.price * item.quantity) + result, 0);
    const total = shipping + subTotal;
    this.cartSummarySource.next({ shipping, subTotal, total });
  }

  addItemToBasket(product: Product, quantity: number = 1) {
    const item: ICartItem = this.mapProductToItem(product, quantity);
    const basket: IShoppingCart = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.AddOrUpdateItem(basket.items, item);
    this.setBasket(basket);
  }
  private AddOrUpdateItem(items: ICartItem[], item: ICartItem): ICartItem[] {
    const index = items.findIndex(i => i.id === item.id);

    if (index === -1) {
      items.push(item);
    } else {
      items[index].quantity += item.quantity;
    }

    return items;
  }

  private createBasket(): IShoppingCart {
    const shoppingCart = new ShoppingCart();
    localStorage.setItem('basket_id', shoppingCart.id);
    return shoppingCart;
  }

  private mapProductToItem(product: Product, quantity: number): ICartItem {
    return {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl,
      category: product.category,
      brand: product.brand,
    }
  }
}
