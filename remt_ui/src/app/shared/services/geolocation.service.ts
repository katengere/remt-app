import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getPosition(cbSuccess: (pos:any) => void, cbError: (err:any) => void, cbNoGeo: () => void) {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
    cbNoGeo();
    }
    }
}
