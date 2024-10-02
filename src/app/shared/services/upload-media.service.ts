import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { END_Points } from '../../core/http/global/global-config';

@Injectable({
  providedIn: 'root'
})
export class UploadMediaService {

  http = inject(HttpClient)
  mediaURL = END_Points

  uploadMedia(img: File): Observable<any> {
    return this.http.post<any>(this.mediaURL.media.upload, img).pipe(
      catchError(
        (error) => {
          console.log(error)
          let errMsg = "Could not upload media"
          return throwError(() => new Error(errMsg))
        }
      )
    )
  }
}
