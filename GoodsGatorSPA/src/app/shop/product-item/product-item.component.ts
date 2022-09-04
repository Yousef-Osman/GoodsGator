import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/_shared/interfaces/product';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCartShopping as fasCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  
  constructor(library: FaIconLibrary) {
    library.addIcons(fasCartShopping);
  }

  ngOnInit(): void {
  }

}
