import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashCan as fasTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { IBasket } from '../_shared/interfaces/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(library: FaIconLibrary, private basketService: BasketService) {
    library.addIcons(fasTrashCan);
  }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$
  }

  addToCart(){
    // this.basketService.addItemToBasket();
  }

}
