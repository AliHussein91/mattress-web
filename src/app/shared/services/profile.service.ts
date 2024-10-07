import { UserProfile } from '../types/user-profile';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { END_Points } from '../../core/http/global/global-config';
import { Observable } from 'rxjs';
import { Address } from '../types/address';




@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileURL = END_Points.profile
  http = inject(HttpClient)
  userProfile = signal<UserProfile | null>(null)

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.profileURL.getProfile)
  }

  getAddress(): Observable<{ data: Address[] }>  {
    return this.http.get<{ data: Address[] }>(this.profileURL.getAddress)
  }
  addNewAddress(address: { data: Address }): Observable<{ included: Address[] }> {
    return this.http.post<{ included: Address[] }>(this.profileURL.addAddress, address)
  }

  deleteAddress(addressId: string) {
    console.log(`${this.profileURL.deleteAddress}/${addressId}`);
    
    return this.http.delete(`${this.profileURL.deleteAddress}/${addressId}`)
  }
}
