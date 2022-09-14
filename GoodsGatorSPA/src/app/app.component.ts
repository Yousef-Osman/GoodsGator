import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './_shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GoodsGatorSPA';

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.loadShoppingCart();
  }

  loadShoppingCart() {
    const cartId = localStorage.getItem('cart_id');
    if (cartId) {
      this.shoppingCartService.getShoppingCart(cartId).subscribe();
    }
  }

}
