import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashCan as fasTrashCan } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(library: FaIconLibrary, private basketService: BasketService) {
    library.addIcons(fasTrashCan);
  }

  ngOnInit(): void {
  }

}
