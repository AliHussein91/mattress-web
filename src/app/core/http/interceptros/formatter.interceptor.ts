import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { Formatter } from "sarala-json-api-data-formatter";

export const FormatterInterceptor: HttpInterceptorFn = (req, next) => {

  const formatter:any = new Formatter();

  
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.url && !event.url.includes('i18n')) {
         const {body} = event
         const ParsedData = formatter.deserialize(body);
        console.log("🚀 ~ tap ~ ParsedData:", ParsedData)
        return ParsedData
       }
    })
   
  );
};
