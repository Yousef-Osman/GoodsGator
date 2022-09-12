import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, subscribeOn } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasketItem, IBasket } from '../_shared/interfaces/basket';
import { Product } from '../_shared/interfaces/product';
import { Basket } from '../_shared/models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl: string = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket)
      })
    )
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe({
      next: (basket: IBasket) => { this.basketSource.next(basket) },
      error: e => console.log(e)
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(product: Product, quantity: number = 1) {
    const item: BasketItem = this.mapProductToItem(product, quantity);
    const basket: IBasket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.AddOrUpdateItem(basket.items, item);
    this.setBasket(basket);
  }
  private AddOrUpdateItem(items: BasketItem[], item: BasketItem): BasketItem[] {
    const index = items.findIndex(i => i.id === item.id);

    if (index === -1) {
      items.push(item);
    } else {
      items[index].quantity += item.quantity;
    }

    return items;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductToItem(product: Product, quantity: number): BasketItem {
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
