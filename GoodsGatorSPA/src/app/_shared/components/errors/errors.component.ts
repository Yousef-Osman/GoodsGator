import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {
  statusCode: number = 404;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let status = this.route.snapshot.paramMap?.get('statusCode');

    if (status)
      this.statusCode = +status;
  }

}
