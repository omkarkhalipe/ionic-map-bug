import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Polyline,
  LatLng,
  Marker,
  Poly
} from '@ionic-native/google-maps';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;

  constructor(public navCtrl: NavController) {
    
  }
  ionViewDidEnter()
  {
    this.loadMap();
  }
  loadMap() {
   // alert("test");
    let HND_AIR_PORT = {lat: 35.548852, lng: 139.784086};
    let SFO_AIR_PORT = {lat: 37.615223, lng: -122.389979};
    let HNL_AIR_PORT = {lat: 21.324513, lng: -157.925074};
    let AIR_PORTS = [
      HND_AIR_PORT,
      HNL_AIR_PORT,
      SFO_AIR_PORT
    ];
try
{

 
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target:  AIR_PORTS
      },
      zoom: 18,
      tilt: 30
    });
  }
  catch(err)
  {
    console.log(JSON.stringify(err));
    alert(JSON.stringify(err))

  }
  
    let polyline: Polyline = this.map.addPolylineSync({
      points: AIR_PORTS,
      color: '#AA00FF',
      width: 10,
      geodesic: true,
      clickable: true  // clickable = false in default
    });

    polyline.on(GoogleMapsEvent.POLYLINE_CLICK).subscribe((params: any) => {
      let position: LatLng = <LatLng>params[0];
     alert("test"+ Poly.isLocationOnEdge(position,AIR_PORTS));
     console.log("test"+ Poly.isLocationOnEdge(position,AIR_PORTS));

      let marker: Marker = this.map.addMarkerSync({
        position: position,
        title: position.toUrlValue(),
        disableAutoPan: true
      });
      marker.showInfoWindow();
    });
  }


}

   
  



