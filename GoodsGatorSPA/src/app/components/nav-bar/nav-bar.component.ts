import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCartShopping as fasCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/_basket/basket.service';
import { IBasket } from 'src/app/_shared/interfaces/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  basket$: Observable<IBasket>;

  constructor(library: FaIconLibrary, private basketService: BasketService) {
    library.addIcons(fasCartShopping);
  }
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

}
