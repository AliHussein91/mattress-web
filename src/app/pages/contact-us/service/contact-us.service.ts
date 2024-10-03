import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { END_Points } from '../../../core/http/global/global-config';
import { Message } from '../message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  contactURL = END_Points.conatct
  http = inject(HttpClient)

  sendMessage(message: Message): Observable<any> {
    return this.http.post<any>(this.contactURL.sendMessage, message)
  }
}
