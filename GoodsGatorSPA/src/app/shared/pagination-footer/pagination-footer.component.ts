import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-footer',
  templateUrl: './pagination-footer.component.html',
  styleUrls: ['./pagination-footer.component.scss']
})
export class PaginationFooterComponent implements OnInit {
  @Input() pagination;
  @Output() pageChanged = new EventEmitter<number>;
  constructor() { }

  ngOnInit(): void {
  }

  onPageChanged(newPage) {
    this.pageChanged.emit(newPage);
  }

}
