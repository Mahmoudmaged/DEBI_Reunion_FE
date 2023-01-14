import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 29.986358540343307;
  lng = 31.26789936670175;
  link: any = "";
  constructor() { }

  sideMessage: string = ""
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }

  ngOnInit(): void {
  }

  mapCoords(event: any) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.link = `https://www.google.com/maps/@${this.lat},${this.lng}z`
    console.log(this.link);


  }

}
