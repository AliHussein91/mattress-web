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
  private readonly userApi = END_Points.user;
  private readonly http = inject(HttpClient);

  constructor(private messaging: Messaging) {}

  requestPermission(cb?: Function) {
    getToken(this.messaging, {
      vapidKey:
        'BLb0afOl9tCTyE6gnqAXD-4f0t7I7WtppkqvI0gLkU6-ip6iYAzo_eSmAxDfoA-75KBDMe6FC_sibEyyV4lIzF8',
    })
      .then((token) => {
        // cheeck if cb is a function
        if (cb && typeof cb === 'function') {
          token && cb(token);
        }
      })
      .catch((err) => {
        console.error('Error getting FCM token:', err);
      });
  }

  listenForMessages(cb?: Function) {
    onMessage(this.messaging, (payload) => {
      console.log('Message received:', payload);
      // cheeck if cb is a function
      if (cb && typeof cb === 'function') {
        payload && cb(payload);
      }
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
  updateUserDeviceToken(deviceToken: string): Observable<any> {
    return this.http.post<any>(this.userApi.updateUserDeviceToken, {
      data: {
        type: 'new device token',
        id: null,
        attributes: {
          device_token: deviceToken,
          device_type: 'web',
        },
      },
    });
  }
  markNotificationAsRead(id: string): Observable<any> {
    return this.http.get<any>(this.api.markNotificationAsRead(id));
  }
  markAllNotificationAsRead(): Observable<any> {
    return this.http.get<any>(this.api.markAllNotificationAsRead);
  }
}
