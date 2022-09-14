import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICartItem, ICartSummary, IShoppingCart } from '../_shared/interfaces/iShoppingCart';
import { IProduct } from '../_shared/interfaces/iProduct';
import { ShoppingCart } from '../_shared/models/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  baseUrl: string = environment.apiUrl;
  private shoppingCart = new BehaviorSubject<IShoppingCart>(null);
  cart$ = this.shoppingCart.asObservable();
  private cartSummarySource = new BehaviorSubject<ICartSummary>(null);
  cartSummary$ = this.cartSummarySource.asObservable();

  constructor(private http: HttpClient) { }

  getShoppingCart(id: string) {
    return this.http.get(this.baseUrl + 'shoppingCart?id=' + id).pipe(
      map((cart: IShoppingCart) => {
        this.shoppingCart.next(cart);
        this.getCatTotal();
      })
    )
  }

  setShoppingCart(cart: IShoppingCart) {
    return this.http.post(this.baseUrl + 'shoppingCart', cart).subscribe({
      next: (cart: IShoppingCart) => {
        this.shoppingCart.next(cart);
        this.getCatTotal();
      },
      error: e => console.log(e)
    });
  }

  getCurrentCartValue() {
    return this.shoppingCart.value;
  }

  getCatTotal() {
    const shipping = 50;
    const items = this.getCurrentCartValue().items;
    const subTotal = items.reduce((result, item) => (item.price * item.quantity) + result, 0);
    const total = shipping + subTotal;
    this.cartSummarySource.next({ shipping, subTotal, total });
  }

  addItemToCart(product: IProduct, quantity: number = 1) {
    const item: ICartItem = this.mapProductToItem(product, quantity);
    const cart: IShoppingCart = this.getCurrentCartValue() ?? this.createShoppingCart();
    cart.items = this.AddOrUpdateItem(cart.items, item);
    this.setShoppingCart(cart);
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

  private createShoppingCart(): IShoppingCart {
    const shoppingCart = new ShoppingCart();
    localStorage.setItem('cart_id', shoppingCart.id);
    return shoppingCart;
  }

  private mapProductToItem(product: IProduct, quantity: number): ICartItem {
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
