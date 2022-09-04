import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCartShopping as fasCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ShopService } from '../../_shop/shop.service';
import { Product } from 'src/app/_shared/interfaces/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(library: FaIconLibrary,
              private shopService: ShopService,
              private route: ActivatedRoute, private router: Router) {
    library.addIcons(fasCartShopping);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.shopService.getProduct(id).subscribe({
      next: res => this.product = res,
      error: e => console.log(e)
    })
  }

  onGoBack(){
    this.router.navigate(['/products']);
  }

}
