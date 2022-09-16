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
  apiUrl: string = this.baseUrl + 'shoppingCart';
  private shoppingCartSource = new BehaviorSubject<IShoppingCart>(null);
  cart$ = this.shoppingCartSource.asObservable();
  private cartSummarySource = new BehaviorSubject<ICartSummary>(null);
  cartSummary$ = this.cartSummarySource.asObservable();

  constructor(private http: HttpClient) { }

  getShoppingCart(id: string) {
    return this.http.get(this.apiUrl + '?id=' + id).pipe(
      map((cart: IShoppingCart) => {
        this.shoppingCartSource.next(cart);
        this.getCartTotal();
      })
    )
  }

  setShoppingCart(cart: IShoppingCart) {
    return this.http.post(this.apiUrl, cart).subscribe({
      next: (cart: IShoppingCart) => {
        this.shoppingCartSource.next(cart);
        this.getCartTotal();
      },
      error: e => console.log(e)
    });
  }

  getCurrentCartValue() {
    return this.shoppingCartSource.value;
  }

  getCartTotal() {
    const shipping = 50;
    const items = this.getCurrentCartValue().items;
    const subTotal = items.reduce((result, item) => (item.price * item.quantity) + result, 0);
    const total = shipping + subTotal;
    this.cartSummarySource.next({ shipping, subTotal, total });
  }

  incrementItemQuantity(id: string) {
    const cart = this.getCurrentCartValue();
    const index = cart.items.findIndex(item => item.id === id);
    cart.items[index].quantity++;
    this.setShoppingCart(cart);
  }

  decrementItemQuantity(id: string) {
    const cart = this.getCurrentCartValue();
    const index = cart.items.findIndex(item => item.id === id);
    if (cart.items[index].quantity > 1) {
      cart.items[index].quantity--;
      this.setShoppingCart(cart);
    } else {
      this.removeCartItem(id);
    }
  }
  
  removeCartItem(id: string, itemIndex: number = -1) {
    const cart = this.getCurrentCartValue();
    cart.items = cart.items.filter(item => item.id !== id);

    if (cart.items.length > 0)
      this.setShoppingCart(cart);
    else
      this.deleteShoppingCart(id);
  }

  deleteShoppingCart(id: string) {
    this.http.delete(this.apiUrl + '?id=' + id).subscribe({
      next: () => {
        this.shoppingCartSource.next(null);
        this.cartSummarySource.next(null);
        localStorage.removeItem('cart_id');
      },
      error: e => console.log(e)
    });
  }

  addItemToCart(product: IProduct, quantity: number = 1) {
    const item: ICartItem = this.mapProductToItem(product, quantity);
    const cart: IShoppingCart = this.getCurrentCartValue() ?? this.createShoppingCart();
    cart.items = this.AddOrUpdateItem(cart.items, item);
    this.setShoppingCart(cart);
  }

  getItemQuantity(id: string): number {
    const cart = this.getCurrentCartValue();
    const exist = cart?.items.some(item => item.id === id);
    if (!exist) return 0;

    const index = cart.items.findIndex(item => item.id === id);
    return cart.items[index].quantity;
  }

  private AddOrUpdateItem(items: ICartItem[], item: ICartItem): ICartItem[] {
    const index = items.findIndex(i => i.id === item.id);

    if (index === -1) {
      items.push(item);
    } else {
      items[index].quantity = item.quantity;
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
