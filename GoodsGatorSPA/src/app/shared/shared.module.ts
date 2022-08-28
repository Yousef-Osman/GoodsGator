import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';
import { PaginationFooterComponent } from './pagination-footer/pagination-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationFooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule
  ],
  exports:[PaginationHeaderComponent, PaginationFooterComponent, NotFoundComponent]
})
export class SharedModule { }
