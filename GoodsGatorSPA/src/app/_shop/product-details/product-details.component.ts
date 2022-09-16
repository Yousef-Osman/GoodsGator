import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCartShopping as fasCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan as fasTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ShopService } from '../../_shop/shop.service';
import { IProduct } from 'src/app/_shared/interfaces/iProduct';
import { ShoppingCartService } from 'src/app/_shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity: number = 0;
  buttonIsHidden: boolean = true;

  constructor(library: FaIconLibrary,
    private shopService: ShopService,
    private route: ActivatedRoute, private router: Router,
    private shoppingCartService: ShoppingCartService) {
    library.addIcons(fasCartShopping, fasTrashCan);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.shopService.getProduct(id).subscribe({
      next: (res: IProduct) => {
        this.product = res;
        this.getItemQuantity(res.id);
      },
      error: e => console.log(e)
    })
  }

  incrementQuantity(id: string) {
    this.quantity++;
  }

  decrementQuantity(id: string) {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  addItemToCart() {
    if (this.quantity < 1) this.quantity = 1;
    this.shoppingCartService.addItemToCart(this.product, this.quantity);
    this.buttonIsHidden = false;
  }

  removeItem(id: string) {
    this.shoppingCartService.removeCartItem(id);
    this.buttonIsHidden = true;
    this.quantity = 0;
  }

  onGoBack() {
    this.router.navigate(['/products']);
  }

  private getItemQuantity(id: string) {
    const item = this.shoppingCartService.getCartItem(id);

    if (item && item.quantity > 0) {
      this.quantity = item.quantity;
      this.buttonIsHidden = false;
    }
  }
}
