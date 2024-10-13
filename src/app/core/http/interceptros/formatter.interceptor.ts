import {  HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { FormatterSingleton } from '@app/shared/util';
import {  map, mergeMap } from 'rxjs'; 

export const FormatterInterceptor: HttpInterceptorFn = (req, next) => {


  return next(req).pipe(
    mergeMap(async (event:HttpEvent<any> ) => {
      if (event instanceof HttpResponse && event.url && !event.url.includes('i18n')) {
        const formatter = FormatterSingleton.getInstance();
        const res =  await formatter.formatData(event.body); 
       return event.clone({ body: {...res,
        ...(event.body && event.body.meta && { meta: event.body.meta })
       } });
      } else return event;
    })
   
  );
};
