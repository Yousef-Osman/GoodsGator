import { Injectable } from '@angular/core';
import { IToastInfo } from '../_shared/interfaces/iToast-info';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {
  toasts: IToastInfo[] = [];

  constructor() { }

  show(options: IToastInfo) {
    this.toasts.push({ ...options });
  }

  remove(toast: IToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
