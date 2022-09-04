import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationFooterComponent } from '../_shared/components/pagination-footer/pagination-footer.component';
import { ErrorsComponent } from '../_shared/components/errors/errors.component';


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
