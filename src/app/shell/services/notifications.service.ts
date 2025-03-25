import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { END_Points } from '@app/core/http/global/global-config';
import { Observable } from 'rxjs';
import { INotification } from '../types';
import { APIResponse } from '@app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly api = END_Points.notification;
  private readonly http = inject(HttpClient);

  constructor() {}
  getUserNotifications(
    page: number = 1,
  ): Observable<APIResponse<INotification[]>> {
    return this.http.get<APIResponse<INotification[]>>(
      this.api.getUserNotifications,
      {
        params: {
          page: page.toString(),
        },
      },
    );
  }
  getUserUnreadNotificationsCount(): Observable<any> {
    return this.http.get<any>(this.api.getUserUnreadNotificationsCount);
  }
  markNotificationAsRead(id: string): Observable<any> {
    return this.http.get<any>(this.api.markNotificationAsRead(id));
  }
  markAllNotificationAsRead(): Observable<any> {
    return this.http.get<any>(this.api.markAllNotificationAsRead);
  }
}
