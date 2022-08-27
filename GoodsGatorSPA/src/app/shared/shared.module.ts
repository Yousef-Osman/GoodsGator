import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';
import { PaginationFooterComponent } from './pagination-footer/pagination-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationFooterComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[PaginationHeaderComponent, PaginationFooterComponent]
})
export class SharedModule { }
