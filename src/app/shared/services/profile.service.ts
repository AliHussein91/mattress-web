import { UserProfile } from '../types/user-profile';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { END_Points } from '../../core/http/global/global-config';
import { Observable } from 'rxjs';
import { Address } from '../types/address';
import { ProfileUpdates } from '../types/profileUpdates';
import { Orders } from '../types/orders';
import { UserAddress } from '@app/pages/profile/address/address.component';




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

  updateProfile(updates: ProfileUpdates) {
    return this.http.post(this.profileURL.updateProfile, updates)
  }

  getAddress(): Observable<{ data: UserAddress[] }> {
    return this.http.get<{ data: UserAddress[] }>(this.profileURL.getAddress)
  }
  addNewAddress(address: { data: Address }): Observable<{ included: Address[] }> {
    return this.http.post<{ included: Address[] }>(this.profileURL.addAddress, address)
  }

  deleteAddress(addressId: string) {
    return this.http.delete(`${this.profileURL.deleteAddress}/${addressId}`)
  }

  getOrders(): Observable<Orders>{
    return this.http.get<Orders>(this.profileURL.getOrders)
  }

  getFavorites(): Observable<any>{
    return this.http.get<any>(this.profileURL.getFavorites)
  }
}
