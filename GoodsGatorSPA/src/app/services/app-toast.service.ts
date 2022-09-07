import { Injectable } from '@angular/core';
import { ToastInfo } from '../_shared/interfaces/toast-info';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {
  toasts: ToastInfo[] = [];

  constructor() { }

  show(options: ToastInfo) {
    this.toasts.push({ ...options });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
