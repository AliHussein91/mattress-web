import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { geocode } from './geocode';

@Injectable({
  providedIn: 'root'
})
export class GMapService {
  API_KEY = "AIzaSyD9mk1NsCwbCDcKKZRA5ljIQEzeZ-ZhA6c"
  reverseGeocodingURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=`
  language!: string

  http = inject(HttpClient)
  getAddress(lat: number, lng: number):Observable<geocode> {
    if (localStorage.getItem('language')) {
      this.language = localStorage.getItem('language') || 'en'
    }
   return this.http.get<geocode>(`${this.reverseGeocodingURL}${lat},${lng}&key=${this.API_KEY}&language=${this.language}`)
  }

}
