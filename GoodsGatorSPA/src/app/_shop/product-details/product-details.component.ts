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
        this.controlItemInCart(res.id);
      },
      error: e => console.log(e)
    })
  }

  controlItemInCart(id: string) {
    this.quantity =  this.shoppingCartService.getItemQuantity(id);
  }

  onGoBack() {
    this.router.navigate(['/products']);
  }

  addItemToCart(){
    this.shoppingCartService.addItemToCart(this.product);
    this.controlItemInCart(this.product.id);
  }

  incrementQuantity(id: string) {
    if (this.quantity > 0){
      this.shoppingCartService.incrementItemQuantity(id);
    }else{
      this.shoppingCartService.addItemToCart(this.product);
    }

    this.controlItemInCart(id);
  }

  decrementQuantity(id: string) {
    if(this.quantity > 0){
      this.shoppingCartService.decrementItemQuantity(id);
      this.controlItemInCart(id);
    }
  }

  removeItem(id: string) {
    this.shoppingCartService.removeCartItem(id);
    this.controlItemInCart(id);
  }

}
