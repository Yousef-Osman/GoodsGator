import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCartShopping as fasCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { IShoppingCart } from 'src/app/_shared/interfaces/iShoppingCart';
import { ShoppingCartService } from 'src/app/_shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  cart$: Observable<IShoppingCart>;

  constructor(library: FaIconLibrary, private shoppingCartService: ShoppingCartService) {
    library.addIcons(fasCartShopping);
  }
  ngOnInit(): void {
    this.cart$ = this.shoppingCartService.cart$;
  }

}
