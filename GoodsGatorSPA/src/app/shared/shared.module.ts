import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';
import { PaginationFooterComponent } from './pagination-footer/pagination-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorsComponent } from './components/errors/errors.component';
import { SharedRoutingModule } from './shared-routing.module';


@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationFooterComponent,
    ErrorsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedRoutingModule
  ],
  exports:[PaginationHeaderComponent, PaginationFooterComponent, ErrorsComponent]
})
export class SharedModule { }
