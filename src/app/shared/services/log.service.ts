import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export enum LogType {
  success="success",
  info="info",
  warn="warn",
  error="error",
  contrast="contrast",
  secondary="secondary"
}
@Injectable({
  providedIn: 'root'
})
export class LogService {
constructor(public messageService:MessageService) { }


showSuccess(type:LogType=LogType.success,title:string='Success',message:string='Message Content'){
  this.messageService.add({ severity: type.toString(), summary: title, detail: message,icon:' pi pi-check-circle' });

}

}
