import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AppToastService } from '../_shared/services/app-toast.service';
import { BootstrapClass } from '../_shared/enums/bootstrap-class';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastService: AppToastService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(
        error => {
          if (error && (error.status === 404 || error.status === 500)) {
            this.router.navigate(['/error', error.status]);
          }

          if (error && (error.status === 400)) {

            this.displayErrorToast(error);
          }

          return throwError(() => new Error(error.message));
        }
      )
    );
  }

  displayErrorToast(error: any) {
    let validationError = error.error.errors;
    if (validationError) {
      throw validationError;
      // validationError.forEach(message => {this.toastService.show({ body: message, className: BootstrapClass.ToastDanger, delay: 4000 });});
    } else {
      this.toastService.show({ body: error.error.message, className: BootstrapClass.ToastDanger, delay: 4000 });
    }
  }
}
