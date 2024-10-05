import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { END_Points } from '../../core/http/global/global-config';

interface Uploads{
  "data": [
    {
        "type": string,
        "id": string,
        "attributes": {
            "mime_type": string,
            "url": string,
            "extension": string,
            "filename": string,
            "source_filename": string
        }
    }
]
}

@Injectable({
  providedIn: 'root'
})
export class UploadMediaService {

  http = inject(HttpClient)
  mediaURL = END_Points
  uploads = signal<any>(null)

  uploadMedia(img : FormData) :Observable<Uploads>{
    return this.http.post<Uploads>(this.mediaURL.media.upload, img)
  }
}
