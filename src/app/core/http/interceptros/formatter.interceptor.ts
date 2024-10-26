import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { FormatterSingleton } from '@app/shared/util';
import { catchError, mergeMap, throwError, } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

export const FormatterInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    mergeMap(async (event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.url
        && !event.url.includes('i18n')
        && !event.url.includes('reset-password')
        && !event.url.includes('map')
        && !event.url.includes('google')
        && !event.url.includes('/profile/update')
        && !event.url.includes('/user/delete-user')
        && !event.url.includes('/logout')
        && !event.url.includes('/orders/active')
        && !event.url.includes('register')
        && !event.url.includes('/user/favourite-product/')
        && !event.url.includes('add-new-address')
        && !event.url.includes('confirm-otp')
        && !event.url.includes('resend-otp')) {
        const formatter = FormatterSingleton.getInstance();
        let res: any;
        try {
           res = await formatter.formatData(event.body);
          
        } catch (error) {
          res = event.body;
        }
        return event.clone({
          body: {
            ...res,
            ...(event.body && event.body.meta && { meta: event.body.meta })
          }
        });
      } else return event;
    }),
    catchError((err) => {
      console.log("🚀 ~ catchError ~ err:", err)
      if (err.error && err.error.errors && err.error.errors.length) {
        err.error.errors.map((item:any)=>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: item.detail,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        
      }
      if (err.status === 401) {
        localStorage.clear();
        window.location.replace(
          `/auth/login?redirectFrom=${window.location.href}`
        );
      }


      if (err.status && !(err.status === 422)) {
        console.log(err)
        // Swal.fire({
        //   icon: 'warning',
        //   position: 'center',
        //   text: this.translate.instant('error'),
        //   title:err.error,
        //   showConfirmButton: false,
        //   timer: 5000,
        // });
      }

      if (err.status === 0) {
        Swal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
          position: 'top-start',
          text: 'check your internet connection',
          showCancelButton: false,
          showCloseButton: false,
        });
      }
      if (err.status === 500) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500,
        });
        
      }

      const error = err.error
        ? err.error.message || err.statusText
        : err.status;
      return throwError(error);
    })
  );
};
