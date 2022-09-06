import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  requestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.requestCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-spin-clockwise',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333',
      size: 'medium'
    });
  }

  idle() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.spinnerService.hide();
    }
  }
}
