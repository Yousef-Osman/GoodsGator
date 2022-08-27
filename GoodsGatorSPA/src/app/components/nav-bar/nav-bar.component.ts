import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCartShopping as fasCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  constructor(library: FaIconLibrary) {
    library.addIcons(fasCartShopping);
  }
  ngOnInit(): void {
  }

}
