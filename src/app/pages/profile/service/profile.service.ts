import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { END_Points } from '../../../core/http/global/global-config';



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

  getProfile(){
    return this.http.get(this.profileURL.getProfile) 
  }

  addNewAddress(address: Address){
    return this.http.post(this.profileURL.addAddress, address)
  }
}
