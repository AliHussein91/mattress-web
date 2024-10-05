import { Profile } from './../profile';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { END_Points } from '../../../core/http/global/global-config';
import { Observable } from 'rxjs';



export interface Address{
  "data": {
    "type": "new address",
    "id": null,
    "attributes": {
        "address": string,
        "mobile_number":string
    }
}
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileURL = END_Points.profile
  http =inject(HttpClient)
  userProfile = signal<Profile | null>(null)

  getProfile(): Observable<Profile>{
    return this.http.get<Profile>(this.profileURL.getProfile) 
  }

  addNewAddress(address: Address){
    return this.http.post(this.profileURL.addAddress, address)
  }
}
