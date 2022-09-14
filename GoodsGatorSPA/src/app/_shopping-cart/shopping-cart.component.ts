import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashCan as fasTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { ICartSummary, IShoppingCart } from '../_shared/interfaces/iShoppingCart';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<IShoppingCart>;
  cartSummary$: Observable<ICartSummary>;

  constructor(library: FaIconLibrary, private shoppingCartService: ShoppingCartService) {
    library.addIcons(fasTrashCan);
  }

  ngOnInit(): void {
    this.cart$ = this.shoppingCartService.cart$
    this.cartSummary$ = this.shoppingCartService.cartSummary$
  }

  addToCart(){ }

}
