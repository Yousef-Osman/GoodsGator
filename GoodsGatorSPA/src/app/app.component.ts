import { Component, OnInit } from '@angular/core';
import { BasketService } from './_basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GoodsGatorSPA';

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe();
    }
  }

}
