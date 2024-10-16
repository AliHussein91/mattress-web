import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { FormatterSingleton } from '@app/shared/util';
import { mergeMap, } from 'rxjs';

export const FormatterInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    mergeMap(async (event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.url
        && !event.url.includes('i18n')
        && !event.url.includes('reset-password')
        && !event.url.includes('map')
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
        const res = await formatter.formatData(event.body);
        return event.clone({
          body: {
            ...res,
            ...(event.body && event.body.meta && { meta: event.body.meta })
          }
        });
      } else return event;
    })
  );
};
