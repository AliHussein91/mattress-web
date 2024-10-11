import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { LogService, LogType } from '@app/shared/services/log.service';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { Formatter } from "sarala-json-api-data-formatter";

export const MessageInterceptor: HttpInterceptorFn = (req, next) => {

  const msgFormatter: any = new Formatter();
  const messageService = new MessageService();
  const log = new LogService(messageService);

  return next(req).pipe(tap((event:any) => {
    if (event instanceof HttpResponse && event.url && !event.url.includes('i18n')) {
      const { body } = event 
      console.log("🚀 ~ returnnext ~ body:", body)
      if(body && body.meta && body.data.meta) log.showSuccess(LogType.success,body.meta.message);
      return body
    }
  }));
};
