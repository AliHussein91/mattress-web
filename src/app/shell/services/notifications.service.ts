import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { END_Points } from '@app/core/http/global/global-config';
import { Observable } from 'rxjs';
import { INotification } from '../types';
import { APIResponse } from '@app/shared/types';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly api = END_Points.notification;
  private readonly http = inject(HttpClient);

  constructor(private messaging: Messaging) {}

  requestPermission() {
    getToken(this.messaging, {
      vapidKey:
        'BGHMfimrAIzVJwmGuQO8gi9hsd0a2bF-_L0qPwriHqX8d5gWuFJ_5Lp2TEAOQPYOSIBWxrjNp2QQniWY1_iUADU',
    })
      .then((token) => {
        console.log('FCM Token:', token);
        // Send the token to your server to save it
      })
      .catch((err) => {
        console.error('Error getting FCM token:', err);
      });
  }

  listenForMessages() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received:', payload);
      // Handle the notification payload
    });
  }

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
