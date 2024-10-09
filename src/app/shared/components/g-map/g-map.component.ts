import { GMapService } from './g-map.service';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { GoogleMap, MapMarker } from "@angular/google-maps";

@Component({
  selector: 'app-g-map',
  standalone: true,
  imports: [GoogleMap, MapMarker],
  templateUrl: './g-map.component.html',
  styleUrl: './g-map.component.scss'
})

export class GMapComponent implements OnInit {
  @Output() userAddress = new EventEmitter()
  @Output() userCoords = new EventEmitter()
  location: { lat: number, lng: number } = { lat: 30.0444, lng: 31.2357 }
  zoom = 14;
  center: google.maps.LatLngLiteral = this.location;

  gmapService = inject(GMapService)

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log("Location is not supported");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location.lat = position.coords.latitude;
        this.location.lng = position.coords.longitude;
      });
    }
  }

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition!: google.maps.LatLngLiteral;

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPosition = event.latLng!.toJSON();
    this.gmapService.getAddress(this.markerPosition.lat, this.markerPosition.lng).subscribe((data) => {
      this.userAddress.emit(data.results[0].formatted_address)
    })
    this.userCoords.emit(this.markerPosition)
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

}
