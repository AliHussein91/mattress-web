import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { Formatter } from "sarala-json-api-data-formatter";

export const FormatterInterceptor: HttpInterceptorFn = (req, next) => {

  const msgFormatter: any = new Formatter();

  return next(req).pipe(tap((event:any) => {
    if (event instanceof HttpResponse && event.url && !event.url.includes('i18n')) {
      const { body } = event 
      return body
    }
  }));
};
