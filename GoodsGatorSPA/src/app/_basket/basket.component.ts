import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashCan as fasTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { IShoppingCart, ICartSummary } from '../_shared/interfaces/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  cart$: Observable<IShoppingCart>;
  cartSummary$: Observable<ICartSummary>;

  constructor(library: FaIconLibrary, private basketService: BasketService) {
    library.addIcons(fasTrashCan);
  }

  ngOnInit(): void {
    this.cart$ = this.basketService.cart$
    this.cartSummary$ = this.basketService.cartSummary$
  }

  addToCart(){
    // this.basketService.addItemToBasket();
  }

}
